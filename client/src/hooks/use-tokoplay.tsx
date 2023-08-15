import { useEffect, useState } from "react"
import { fetchVideos } from "../api/video.api"
import { Video } from "../types/tokoplay"
import { getUniqueVideoCategories } from "../utils/tags"

function useTokoplay() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [tags, setTags] = useState<string[]>()

  useEffect(() => {
    fetchVideos()
      .then((videos) => {
        setVideos(videos)
        setTags(getUniqueVideoCategories(videos))
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return { videos, error, tags, isLoading } as const
}

export default useTokoplay
