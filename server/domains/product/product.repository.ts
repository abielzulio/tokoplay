import { nanoid } from "nanoid"
import Product, { ProductDocument } from "./product.entity"
import { WithId } from "mongodb"

export class ProductRepository {
  public async createProduct(
    payload: Omit<ProductDocument, "id" | "_id" | "createdAt">
  ): Promise<void> {
    try {
      const id = nanoid()
      const newProduct: Omit<ProductDocument, "_id"> = {
        id,
        createdAt: new Date(),
        ...payload,
      }
      await Product.insertOne(newProduct)
    } catch (error) {
      throw error
    }
  }
  public async getProductsByVideoId(
    videoId: ProductDocument["videoId"]
  ): Promise<WithId<Pick<ProductDocument, "_id">>[]> {
    try {
      const products = Product.find({ videoId }, { projection: { _id: 0 } })
      return products
    } catch (error) {
      throw error
    }
  }
}
