import { X } from "lucide-react"
import ReactPlayer from "react-player/youtube"
import Comment from "../components/video/comment"
import useVideoPage from "../hooks/use-video"
import ProductCard from "../components/video/product-card"

function VideoPage() {
  const { video, products, comments } = useVideoPage("/video/:id")
  return (
    <section className="relative flex min-w-screen min-h-screen flex-col bg-[#000]">
      <div className="flex gap-[10px] items-center p-[12px] bg-gray border-b-[1px] border-b-white/10">
        <button type="button" onClick={() => history.back()}>
          <X size={14} />
        </button>
        <p className="font-semibold">{video.data?.title}</p>
        <p className="opacity-50">{video.data?.channel}</p>
      </div>
      <div className="flex w-full h-[93vh]">
        <div className="w-full bg-white/5 p-[24px] overflow-y-auto border-r-[1px] border-r-white/10">
          <div className="grid grid-rows-1 gap-[24px]">
            {products.isLoading || !products.data
              ? [...Array(6).keys()].map((_, id) => (
                  <span
                    key={id}
                    className="h-[200px] rounded-md bg-white/10 animate-pulse"
                  />
                ))
              : products.data &&
                products.data.map((product) => (
                  <ProductCard
                    isLoading={products.isLoading}
                    product={product}
                    key={product.id}
                  />
                ))}
          </div>
        </div>
        <div className="relative min-w-[430px]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.data?.id}`}
            loop
            playing
            light
            className="absolute top-0 left-0 h-screen"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className="w-full border-l-[1px] border-l-white/10 bg-gray relative">
          {video.data && (
            <Comment comments={comments} videoId={video?.data?.id} />
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoPage
