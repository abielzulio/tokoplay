import { Video } from "../types/tokoplay"

export function getUniqueVideoCategories(videos: Video[]): string[] {
  const uniqueCategories = new Set<string>()

  videos.forEach((video) => {
    uniqueCategories.add(video.category)
  })

  return Array.from(uniqueCategories)
}
