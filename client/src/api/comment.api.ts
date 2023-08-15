import ky from "ky"
import { KY_CONFIG, handleResponse } from "."
import { Comment, CommentPayload, Video } from "../types/tokoplay"

export const fetchComments = async (
  videoId: Video["id"]
): Promise<Comment[]> => {
  const response = await ky.get(`comments/${videoId}`, KY_CONFIG)

  return await handleResponse<Comment[]>(response)
}

export const createComment = async (
  payload: CommentPayload,
  videoId: Video["id"]
): Promise<void> => {
  const response = await ky.post(`comments/${videoId}`, {
    ...KY_CONFIG,
    json: payload,
  })

  await handleResponse<void>(response)
}
