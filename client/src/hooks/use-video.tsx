import { useRoute } from "wouter"
import { fetchComments } from "../api/comment.api"
import { fetchProducts } from "../api/product.api"
import { fetchVideo } from "../api/video.api"
import { Comment, Product, Video } from "../types/tokoplay"
import useFetch from "./use-fetch"

function useVideo(route: string) {
  const [match, params] = useRoute<{ id: string }>(route)
  /*   const [location, setLocation] = useLocation() */
  const {
    data: video,
    error: videoError,
    isLoading,
  } = useFetch<Video>(() => fetchVideo(params?.id as string))

  const {
    data: products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useFetch<Product[]>(() => fetchProducts(params?.id as string))

  const {
    data: comments,
    error: commentsError,
    isLoading: isCommentsLoading,
    mutate,
  } = useFetch<Comment[]>(() => fetchComments(params?.id as string))

  return {
    video: {
      data: video,
      error: videoError,
      isLoading,
    },
    products: {
      data: products,
      error: productsError,
      isLoading: isProductsLoading,
    },
    comments: {
      data: comments,
      error: commentsError,
      isLoading: isCommentsLoading,
      mutate,
    },
  }
}

export default useVideo
