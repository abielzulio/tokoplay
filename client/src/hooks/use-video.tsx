import { useRoute } from "wouter"
import { fetchComments } from "../api/comment.api"
import { fetchProducts } from "../api/product.api"
import { fetchVideo } from "../api/video.api"
import { Comment, Product, Video } from "../types/tokoplay"
import useFetch from "./use-fetch"

function useVideo(route: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [match, params] = useRoute<{ id: string }>(route)
  const video = useFetch<Video>(() => fetchVideo(params?.id as string))

  const products = useFetch<Product[]>(() =>
    fetchProducts(params?.id as string)
  )

  const comments = useFetch<Comment[]>(() =>
    fetchComments(params?.id as string)
  )

  return {
    video,
    products,
    comments,
  }
}

export default useVideo
