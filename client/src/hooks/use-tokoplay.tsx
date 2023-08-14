import { useEffect, useState } from "react"
import { fetchVideos } from "../api/videos"
import { Video } from "../types/tokoplay"
import { getUniqueVideoCategories } from "../utils/tags"

function useTokoplay() {
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

  return { videos, error, tags, isLoading } as const
}

export function useFilteredVideos(videos: Video[]) {
  const [search, setSearch] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos)

  useEffect(() => {
    if (!search && selectedTags.length === 0) setFilteredVideos(videos)
    else {
      setFilteredVideos(
        videos.filter((video) => {
          const isSearchMatched = video.title
            .toLowerCase()
            .includes(search.toLowerCase())
          const isCategoryMatched =
            selectedTags.length > 0
              ? selectedTags.includes(video.category)
              : true
          return isSearchMatched && isCategoryMatched
        })
      )
    }
  }, [search, selectedTags, videos])

  return {
    filteredVideos,
    filterValue: {
      search,
      selectedTags,
      setSearch,
      setSelectedTags,
    },
  } as const
}

export default useTokoplay