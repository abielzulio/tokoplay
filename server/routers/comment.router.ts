import express from "express"
import * as CommentController from "../controllers/comment.controller"

const commentRouter = express.Router()

commentRouter.post("/comments/:videoId", CommentController.createComment)
commentRouter.get("/comments/:videoId", CommentController.getCommentsByVideoId)

export default commentRouter
