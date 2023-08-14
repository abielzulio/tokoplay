import ky from "ky"
import { API_URL } from "."
import { TokoplayResponseData, TokoplayResponseMeta } from "./api"
import { Video } from "../types/tokoplay"

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await ky.get(`videos`, {
    prefixUrl: API_URL,
  })

  if (!response.ok) {
    const { meta } = await response.json<TokoplayResponseMeta>()
    throw new Error(meta.message)
  }

  const { data } = await response.json<TokoplayResponseData<Video[]>>()

  return data
}
