import { Send } from "lucide-react"
import { memo, useState } from "react"

const CommentItem = memo(
  ({
    comment,
  }: {
    comment: { name: string; comment: string; createdAt: Date }
  }) => {
    return (
      <div className="flex gap-[5px] items-start h-fit w-full bg-gray">
        <div className="flex items-start justify-between w-full gap-[5px]">
          <p className="break-all text-[14px]">
            <span className="mr-[5px]">{comment.name}</span>
            <span className="opacity-50">{comment.comment}</span>
          </p>
          <p className="opacity-50 min-w-[80px] text-right text-[10px]">
            {comment.createdAt.toLocaleTimeString()}
          </p>
        </div>
      </div>
    )
  }
)

const Comment = memo(() => {
  const [comments, setComments] = useState<
    { name: string; comment: string; createdAt: Date }[]
  >([
    {
      name: "Rizky",
      comment:
        "dakdjasjdalskjdlasjdlaksjdlkasjdlasjdlasjdajsldkjaslkdjalkdjalkasdakdjasjdalskjdlasjdlaksjdlkasjdlasjdlasjdajsldkjaslkdjalkdjalkasdakdjasjdalskjdlasjdlaksjdlkasjdlasjdlasjdajsldkjaslkdjalkdjalk",
      createdAt: new Date(),
    },
    {
      name: "Alex",
      comment: "cakep",
      createdAt: new Date(),
    },
  ])
  const [comment, setComment] = useState("")
  return (
    <div className="w-full border-l-[1px] border-l-white/10 bg-gray relative">
      <div className="flex flex-col gap-[12px] w-full h-[90vh] overflow-y-auto px-[24px] pt-[24px] pb-[48px]">
        {comments.map((c, id) => (
          <CommentItem comment={c} key={id} />
        ))}
      </div>
      <form
        className="absolute flex items-center bg-gray p-[10px] gap-[15px] inset-x-0 bottom-0 w-full h-[54px] z-5 border-t-[1px] border-white/20"
        onSubmit={(e) => {
          e.preventDefault()
          if (!comment) return alert("Comment kosong")

          setComments((prev) => [
            ...prev,
            {
              name: "Rizky",
              comment,
              createdAt: new Date(),
            },
          ])

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
    </div>
  )
})

export default Comment
