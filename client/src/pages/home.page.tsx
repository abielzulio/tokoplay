import { forwardRef, useState } from "react"
import { Link } from "wouter"
import { cn } from "../utils/cn"
import { Search, Check, X, Eye } from "lucide-react"

type Category = "Live" | "Eksplor" | "Promo" | "Terbaru" | "Akan Datang"

const categories: Category[] = [
  "Live",
  "Eksplor",
  "Promo",
  "Terbaru",
  "Akan Datang",
]

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
}

interface Product {
  id: string
  name: string
  image: string
  price: number
  url: string
}

interface Video {
  id: string
  category: Category
  title: string
  channel: string
  image: string
  url: string
  views: number
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

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ isSelected, children, ...props }, ref) => {
    const [isHovering, setHovering] = useState(false)
    return (
      <button
        type="button"
        className={cn(
          " flex items-center gap-[10px] py-[5px] text-[12px]  border-[1px] border-white/20  transition rounded-full",
          {
            "bg-white/100 text-black hover:bg-white/90 border-r-black/20 px-[10px]":
              isSelected,
            " bg-white/[0.05] hover:opacity-90 text-white hover:border-white/90 px-[15px]":
              !isSelected,
          }
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        ref={ref}
        {...props}
      >
        {isSelected ? isHovering ? <X size={16} /> : <Check size={16} /> : null}
        <span>{children}</span>
        {typeof children === "string" &&
        children.length > 0 &&
        children === "Live" ? (
          <span className="w-[8px] h-[8px] -ml-[1px] rounded-full bg-red-500 animate-pulse animate" />
        ) : null}
      </button>
    )
  }
)

function HomePage() {
  const [tags, setTags] = useState<string[]>([])
  return (
    <main className="flex flex-col w-screen min-h-screen text-white bg-[#000]">
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
            <div className="flex flex-col gap-[10px] w-full h-[400px] rounded-md border-[1px] overflow-hidden border-white/10">
              <div className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 flex items-center text-[12px] px-[10px] py-[5px]">
                  {video.category === "Live" && (
                    <div className="bg-red-500 flex items-center gap-[5px] font-medium px-[4px] py-[2px] rounded-l-md border-[1px] border-red-600/30 text-white text-[10px]">
                      <span>Live</span>
                      <span className="w-[5px] h-[5px] rounded-full bg-white animate-pulse animate" />
                    </div>
                  )}
                  <div className="bg-black/70 backdrop-blur-md flex items-center gap-[5px] px-[4px] py-[4px] rounded-r-md text-[8px] border-[1px] border-white/10">
                    <Eye size={10} className="opacity-50" />
                    <span className="font-mono">{video.views}</span>
                  </div>
                </div>
                <img
                  src={video.image}
                  alt={video.title}
                  className="object-cover w-full h-[500px]"
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[3px] px-[10px] py-[5px] bg-black/50 backdrop-blur-md">
                  <h3 className="text-[14px] font-medium">{video.title}</h3>
                  <span className="text-[12px] opacity-50">
                    {video.channel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
