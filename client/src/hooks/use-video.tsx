import { useLocation, useRoute } from "wouter"
import { fetchProducts } from "../api/product.api"
import { fetchVideo } from "../api/video.api"
import { Product, Video } from "../types/tokoplay"
import useFetch from "./use-fetch"

function useVideo(route: string) {
  const [match, params] = useRoute<{ id: string }>(route)
  const [location, setLocation] = useLocation()
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

  /*   const [products, setProducts] = useState<Product[]>([])
  const [comments, setComments] = useState<Comment[]>([]) */

  /*   const [isLoading, setLoading] = useState(true) */

  /*   useEffect(() => {}, []) */

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
    /*     products, */
  }
}

export default useVideo
