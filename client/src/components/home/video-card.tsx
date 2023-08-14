import { Eye } from "lucide-react"
import { memo } from "react"
import { Link } from "wouter"
import useVideo from "../../hooks/use-video"
import { Video } from "../../types/tokoplay"
import { cn } from "../../utils/cn"
import { randomize } from "../../utils/random"

const VideoCard = memo(({ video }: { video: Video }) => {
  const { isLoading } = useVideo()
  return (
    <Link href={`/video/${video.id}`}>
      <div className="flex flex-col hover:cursor-pointer gap-[10px] w-full h-[400px] rounded-md border-[1px] overflow-hidden border-white/10">
        <div className="relative overflow-hidden">
          <img
            src={video.image}
            alt={video.title}
            className={cn("object-cover w-full z-0 h-[500px] transition", {
              "blur-md": isLoading,
              "blur-none": !isLoading,
            })}
          />
          <div className="absolute top-0 left-0 right-0 flex z-5 items-center text-[12px] px-[10px] py-[5px]">
            {video.category === "Live" && (
              <div className="bg-red-500 flex items-center gap-[5px] font-medium px-[4px] py-[2px] rounded-l-md border-[1px] border-red-600/30 text-white text-[10px]">
                <span>Live</span>
                <span className="w-[5px] h-[5px] rounded-full bg-white animate-pulse animate" />
              </div>
            )}
            <div className="bg-black/70 backdrop-blur-md flex items-center gap-[5px] px-[4px] py-[4px] rounded-r-md text-[8px] border-[1px] border-white/10">
              <Eye size={10} className="opacity-50" />
              <span
                className={cn("font-mono transition", {
                  "blur-sm": isLoading,
                  "blur-none": !isLoading,
                })}
              >
                {randomize(200)}
              </span>
            </div>
          </div>
          <div className="absolute border-t-[1px] border-white/20 bottom-0 left-0 right-0 flex z-5 flex-col gap-[3px] px-[10px] py-[5px] bg-black/50 backdrop-blur-md">
            <h3 className="text-[14px] font-medium">{video.title}</h3>
            <span className="text-[12px] opacity-50">{video.channel}</span>
          </div>
        </div>
      </div>
    </Link>
  )
})

export default VideoCard
