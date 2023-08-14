import { useEffect, useState } from "react"
import { Video } from "../types/tokoplay"

function useFilteredVideos(videos: Video[]) {
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

export default useFilteredVideos
