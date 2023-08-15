import type { Options, KyResponse } from "ky"
import { TokoplayResponseData, TokoplayResponseMeta } from "./api"

export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/v1"
    : "https://tokoplay-api.onrender.com"

export const KY_CONFIG: Options = {
  prefixUrl: API_URL,
}

export const handleResponse = async <T>(res: KyResponse): Promise<T> => {
  if (!res.ok) {
    const { meta } = await res.json<TokoplayResponseMeta>()
    throw new Error(meta.message)
  }
  const { data } = await res.json<TokoplayResponseData<T>>()

  return data
}
