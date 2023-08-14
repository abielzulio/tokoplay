import { RedoIcon, X } from "lucide-react"
import { useState } from "react"
import ReactPlayer from "react-player/youtube"
import { useRoute } from "wouter"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import Comment from "../components/video/comment"

interface Product {
  id: string
  video_id?: string
  name: string
  image: string
  price: number
  url: string
}

const products: Product[] = [
  {
    id: "1",
    video_id: "8nz9e8HOWcM",
    name: "DIY Slushy Maker Silica Cup Double Layers Cup Smoothie Pinch Ice Cup - Hijau",
    url: "https://www.tokopedia.com/hongya/diy-slushy-maker-silica-cup-double-layers-cup-smoothie-pinch-ice-cup-hijau-d27e5?extParam=ivf%3Dtrue&src=topads",
    price: 89900,
    image:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/17/9a511a1a-46b4-4a22-adfb-c2f269d6c501.jpg",
  },
  {
    id: "2",
    video_id: "8nz9e8HOWcM",
    name: "DIY Slushy Maker Silica Cup Double Layers Cup Smoothie Pinch Ice Cup - Hijau",
    url: "https://www.tokopedia.com/hongya/diy-slushy-maker-silica-cup-double-layers-cup-smoothie-pinch-ice-cup-hijau-d27e5?extParam=ivf%3Dtrue&src=topads",
    price: 89900,
    image:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/17/9a511a1a-46b4-4a22-adfb-c2f269d6c501.jpg",
  },
  {
    id: "3",
    video_id: "8nz9e8HOWcM",
    name: "DIY Slushy Maker Silica Cup Double Layers Cup Smoothie Pinch Ice Cup - Hijau",
    url: "https://www.tokopedia.com/hongya/diy-slushy-maker-silica-cup-double-layers-cup-smoothie-pinch-ice-cup-hijau-d27e5?extParam=ivf%3Dtrue&src=topads",
    price: 89900,
    image:
      "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/17/9a511a1a-46b4-4a22-adfb-c2f269d6c501.jpg",
  },
]

function VideoPage() {
  const [match, params] = useRoute("/video/:id")

  if (!match) return <RedoIcon to="/" />
  return (
    <section className="relative flex min-w-screen min-h-screen flex-col bg-[#000]">
      <div className="flex gap-[10px] items-center p-[12px] bg-gray border-b-[1px] border-b-white/10">
        <button type="button" onClick={() => history.back()}>
          <X size={14} />
        </button>
        <p className="font-semibold">Slush maker</p>
        <p className="opacity-50">Channel</p>
      </div>
      <div className="flex w-full h-[93vh]">
        <div className="w-full bg-transparent p-[24px] overflow-y-auto">
          <div className="grid grid-rows-1 gap-[24px]">
            {products.map((product, id) => (
              <a
                key={id}
                href={product.url}
                target="_blank"
                rel="noopener nofollow"
              >
                <div className="h-fit flex flex-col border-[1px] border-white/10 rounded-md bg-gray">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[200px] object-cover rounded-t-md"
                    />
                  </div>
                  <div className="flex flex-col p-[10px] gap-[5px]">
                    <p className="font-normal">{product.name}</p>
                    <p className="opacity-50">
                      Rp{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="relative min-w-[430px]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${params?.id}`}
            loop
            playing
            light
            clasName="absolute top-0 left-0 h-screen"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <Comment />
      </div>
    </section>
  )
}

export default VideoPage
