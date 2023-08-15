import { CommentRepository } from "../domains/comment/comment.repository"

export class CommentService {
  private commentRepository: CommentRepository

  constructor() {
    this.commentRepository = new CommentRepository()
  }

  public async createComment(
    payload: Parameters<CommentRepository["createComment"]>[0]
  ): ReturnType<CommentRepository["createComment"]> {
    try {
      await this.commentRepository.createComment(payload)
    } catch (error) {
      throw error
    }
  }

  public async getCommentsByVideoId(
    videoId: Parameters<CommentRepository["getCommentsByVideoId"]>[0]
  ): ReturnType<CommentRepository["getCommentsByVideoId"]> {
    try {
      const comments = await this.commentRepository.getCommentsByVideoId(
        videoId
      )
      return comments
    } catch (error) {
      throw error
    }
  }
}
