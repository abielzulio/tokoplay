import { Search } from "lucide-react"
import { useState } from "react"
import { Link } from "wouter"
import Tag from "../components/home/tag"
import VideoCard, { Video } from "../components/home/video-card"
import { Category } from "../types/tokoplay"

const categories: Category[] = [
  "Live",
  "Eksplor",
  "Promo",
  "Terbaru",
  "Akan Datang",
]

interface Product {
  id: string
  name: string
  image: string
  price: number
  url: string
}

interface User {
  id: string
  name: string
  email: string
  password: string
}

interface Comment {
  id: string
  user: User
  content: string
  createdAt: string
}

const videos: Video[] = [
  {
    id: "1",
    title: "Cutlery Set for Kids",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
  {
    id: "2",
    title: "Cutlery Set for Kids",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
  {
    id: "3",
    title: "Cutlery Set for Kids",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
  {
    id: "4",
    title: "Cutlery Set for Kids HAHAHAHAHAH",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
  {
    id: "5",
    title: "Cutlery Set for Kids",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
  {
    id: "6",
    title: "Cutlery Set for Kids",
    image: "/alerta.jpg",
    url: "https://www.youtube.com/shorts/8nz9e8HOWcM",
    views: 1200,
    channel: "Aleta",
    category: "Live",
  },
]

function HomePage() {
  const [tags, setTags] = useState<string[]>([])
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
      <section className="w-[calc(100vw-24px)] mx-auto bg-[#18181b] border-[1px] border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert(e.currentTarget.search.value)
          }}
          className="flex gap-[15px] p-[15px] items-center border-b-[1px] text-[14px] h-[50px] border-white/20"
        >
          <Search size={12} />
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="w-full bg-transparent"
          />
        </form>
        <div className="flex items-center border-b-[1px] p-[10px] gap-[10px] border-white/20 ">
          {categories.map((category) => (
            <Tag
              onClick={() =>
                tags.includes(category)
                  ? setTags((prev) => prev.filter((item) => item !== category))
                  : setTags([...tags, category])
              }
              isSelected={tags.includes(category)}
            >
              {category}
            </Tag>
          ))}
        </div>
        <div className="p-[10px] grid-cols-6 auto-rows-max grid gap-[20px]">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
