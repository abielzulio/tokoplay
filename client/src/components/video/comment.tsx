import { Send } from "lucide-react"
import { memo, useState } from "react"
import { Comment, Video } from "../../types/tokoplay"
import { FetchStateWithMutate } from "../../hooks/use-fetch"
import { createComment } from "../../api/comment.api"

const CommentItem = memo(({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-[5px] items-start h-fit w-full bg-gray">
      <div className="flex items-start justify-between w-full gap-[5px]">
        <p className="break-all text-[14px]">
          <span className="mr-[5px] font-medium">{comment.username}</span>
          <span className="opacity-50">{comment.comment}</span>
        </p>
        <p className="opacity-50 min-w-[80px] text-right text-[10px]">
          {new Date(comment.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
})

const Comment = memo(
  ({
    comments,
    videoId,
  }: {
    comments: FetchStateWithMutate<Comment[]>
    videoId: Video["id"]
  }) => {
    const [comment, setComment] = useState("")
    return (
      <>
        <div className="flex flex-col gap-[12px] w-full h-[90vh] overflow-y-auto px-[24px] pt-[24px] pb-[48px]">
          {comments.data?.map((c, id) => (
            <CommentItem comment={c} key={id} />
          ))}
        </div>
        <form
          className="absolute flex items-center bg-gray p-[10px] gap-[15px] inset-x-0 bottom-0 w-full h-[54px] z-5 border-t-[1px] border-white/20"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!comment) return alert("Komen tidak boleh kosong")

            const newComment = {
              id: Math.random().toString(36).substr(2, 9),
              videoId,
              username: "Anonymous",
              comment,
              createdAt: new Date().toISOString(),
            }

            const newComments = comments.data
              ? [...comments.data, newComment]
              : [newComment]

            comments.mutate(newComments)

            await createComment(
              { username: newComment.username, comment: newComment.comment },
              videoId
            )

            setComment("")
          }}
        >
          <Send size={16} className="opacity-50" />
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-full text-white rounded-md bg-gray/50"
            placeholder="Comment"
          />
        </form>
      </>
    )
  }
)

export default Comment
