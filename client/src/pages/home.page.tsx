import { Search } from "lucide-react"
import { Link } from "wouter"
import Tag from "../components/home/tag"
import VideoCard from "../components/home/video-card"
import useFilteredVideos from "../hooks/use-filtered-videos"
import useTokoplay from "../hooks/use-tokoplay"

function HomePage() {
  const { videos, tags, isLoading } = useTokoplay()
  const { filteredVideos, filterValue } = useFilteredVideos(videos)
  return (
    <main className="flex flex-col min-w-screen min-h-screen w-full text-white bg-[#000]">
      <div className="flex items-center justify-between p-[12px]">
        <p>☛</p>
        <Link href="/">
          <h1 className="tracking-tight font-mono hover:cursor-pointer text-[24px] font-semibold transition opacity-50 hover:opacity-100 mx-auto">
            TOKOPLAY
          </h1>
        </Link>
        <p>☚</p>
      </div>
      <section className="w-[calc(100vw-24px)] mx-auto bg-gray border-[1px] border-white/10">
        <div className="flex gap-[15px] p-[15px] items-center border-b-[1px] text-[14px] h-[50px] border-white/20">
          <Search size={12} />
          <input
            id="search"
            type="text"
            value={filterValue.search}
            onChange={(e) => filterValue.setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent"
          />
        </div>
        <div className="flex items-center p-[10px] gap-[10px]">
          {tags &&
            tags?.length > 0 &&
            tags.map((category, id) => (
              <Tag
                key={id}
                onClick={() =>
                  filterValue.selectedTags.includes(category)
                    ? filterValue.setSelectedTags((prev) =>
                        prev.filter((item) => item !== category)
                      )
                    : filterValue.setSelectedTags((prev) => [...prev, category])
                }
                isSelected={filterValue.selectedTags.includes(category)}
              >
                {category}
              </Tag>
            ))}
        </div>
        {isLoading ? (
          <div className="p-[10px] grid-cols-6 auto-rows-max grid gap-[20px]">
            {[...Array(6).keys()].map((_, id) => (
              <div
                className="rounded-md h-[400px] animate-pulse bg-white/10"
                key={id}
              />
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="p-[10px] grid-cols-6 auto-rows-max grid gap-[20px]">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="p-[10px] flex items-center justify-center w-full min-h-[50vh]">
            <p className="opacity-50">Video tidak dapat ditemukan</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage
