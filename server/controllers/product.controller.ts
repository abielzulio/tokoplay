import { ProductRepository } from "../domains/product/product.repository"
import type { Request, Response } from "express"
import checkPayloadRequest from "../utils/payload"
import { ProductService } from "../services/product.service"
import { ProductDocument } from "../domains/product/product.entity"

type CreateProductBodyRequest = Omit<
  Parameters<ProductRepository["createProduct"]>[0],
  "videoId"
>

type ProductsByVideoIdParamsRequest = Pick<ProductDocument, "videoId">

export const createProduct = async (
  req: Request<ProductsByVideoIdParamsRequest, {}, CreateProductBodyRequest>,
  res: Response
) => {
  try {
    const { videoId } = req.params

    if (!videoId) {
      return res.status(404).json({
        meta: {
          status: 400,
          message: `Missing required params: videoId`,
        },
      })
    }

    const requiredBody: Array<keyof CreateProductBodyRequest> = [
      "url",
      "name",
      "price",
      "image",
    ]

    checkPayloadRequest<CreateProductBodyRequest>(
      req,
      res,
      "body",
      requiredBody
    )

    const productService = new ProductService()
    await productService.createProduct({ videoId, ...req.body })
    res.status(201).json({ meta: { status: 201 } })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}

export const getProductsByVideoId = async (
  req: Request<ProductsByVideoIdParamsRequest, {}, {}>,
  res: Response
) => {
  try {
    const { videoId } = req.params
    const productService = new ProductService()
    const products = await productService.getProductsByVideoId(videoId)
    if (!products || products.length === 0) {
      return res.status(404).json({
        meta: {
          status: 404,
          message: `Products with videoId ${videoId} not found`,
        },
      })
    }
    res.status(200).json({ meta: { status: 200 }, data: products })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}
