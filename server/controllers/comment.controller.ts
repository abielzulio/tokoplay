import { CommentDocument } from "../domains/comment/comment.entity"
import type { Request, Response } from "express"
import checkPayloadRequest from "../utils/payload"
import { CommentService } from "../services/comment.service"

type CreateCommentBodyRequest = Pick<CommentDocument, "username" | "comment">

type CommentsByIdParamsRequest = Pick<CommentDocument, "videoId">

export const createComment = async (
  req: Request<CommentsByIdParamsRequest, {}, CreateCommentBodyRequest>,
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

    const requiredBody: Array<keyof CreateCommentBodyRequest> = [
      "comment",
      "username",
    ]

    checkPayloadRequest<CreateCommentBodyRequest>(
      req,
      res,
      "body",
      requiredBody
    )

    const commentService = new CommentService()
    await commentService.createComment({ videoId, ...req.body })
    res.status(201).json({ meta: { status: 201 } })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}

export const getCommentsByVideoId = async (
  req: Request<CommentsByIdParamsRequest, {}, {}>,
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
    const commentService = new CommentService()
    const comments = await commentService.getCommentsByVideoId(videoId)
    res.status(200).json({ meta: { status: 200 }, data: comments })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}
