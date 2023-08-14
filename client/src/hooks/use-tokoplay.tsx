import { useEffect, useState } from "react"
import { fetchVideos } from "../api/videos"
import { Video } from "../types/tokoplay"
import { getUniqueVideoCategories } from "../utils/tags"

function useTokoplay(): {
  videos: Video[]
  error: string | undefined
  tags: string[] | undefined
  isLoading: boolean
} {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [tags, setTags] = useState<string[]>()

  useEffect(() => {
    setLoading(true)
    fetchVideos()
      .then((videos) => {
        setVideos(videos)
        setTags(getUniqueVideoCategories(videos))
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return { videos, error, tags, isLoading }
}

export default useTokoplay
