import ky from "ky"
import { KY_CONFIG, handleResponse } from "."
import { Video } from "../types/tokoplay"

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await ky.get(`videos`, KY_CONFIG)

  return await handleResponse<Video[]>(response)
}

export const fetchVideo = async (id: string): Promise<Video> => {
  const response = await ky.get(`videos/${id}`, KY_CONFIG)

  return await handleResponse<Video>(response)
}
