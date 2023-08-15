import { nanoid } from "nanoid"
import Comment, { CommentDocument } from "./comment.entity"
import { WithId } from "mongodb"

export class CommentRepository {
  public async createComment(
    payload: Omit<CommentDocument, "id" | "createdAt" | "_id">
  ): Promise<void> {
    try {
      const id = nanoid()
      const newUser: Omit<CommentDocument, "_id"> = {
        id,
        createdAt: new Date(),
        ...payload,
      }
      await Comment.insertOne(newUser)
    } catch (error) {
      throw error
    }
  }
  public async getCommentsByVideoId(
    videoId: CommentDocument["videoId"]
  ): Promise<WithId<Pick<CommentDocument, "_id">>[]> {
    try {
      const videos = Comment.find({ videoId }, { projection: { _id: 0 } })
      return videos
    } catch (error) {
      throw error
    }
  }
}
