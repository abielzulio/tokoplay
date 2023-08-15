import { Eye, X } from "lucide-react"
import ReactPlayer from "react-player/youtube"
import { Redirect } from "wouter"
import Comment from "../components/video/comment"
import ProductCard from "../components/video/product-card"
import useVideo from "../hooks/use-video"
import { cn } from "../utils/cn"
import randomize from "../utils/random"

function VideoPage() {
  const { video, products, comments } = useVideo("/video/:id")
  if (video.error) return <Redirect to="/" />
  return (
    <section className="relative flex min-w-screen min-h-screen flex-col bg-[#000]">
      <div className="flex items-center w-full bg-gray">
        <div className="flex gap-[10px] items-center p-[12px]  border-b-[1px] border-b-white/10">
          <button type="button" onClick={() => history.back()}>
            <X size={14} />
          </button>
          <p className="font-semibold">{video.data?.title}</p>
          <p className="opacity-50">{video.data?.channel}</p>
        </div>
        {video.data?.category === "Live" && (
          <div className="flex items-center ml-auto p-[12px] border-l-[1px] border-l-white/10">
            <div className="bg-red-500 flex items-center gap-[5px] font-medium px-[4px] py-[2px] rounded-l-md border-[1px] border-red-600/30 text-white text-[10px]">
              <span>Live</span>
              <span className="w-[5px] h-[5px] rounded-full bg-white animate-pulse animate" />
            </div>
            <div className="bg-black/70 backdrop-blur-md flex items-center gap-[5px] px-[4px] py-[4px] rounded-r-md text-[8px] border-[1px] border-white/10">
              <Eye size={10} className="opacity-50" />
              <span
                className={cn("font-mono transition", {
                  "blur-sm": video.isLoading,
                  "blur-none": !video.isLoading,
                })}
              >
                {randomize(200)}
              </span>
            </div>
          </div>
        )}
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
