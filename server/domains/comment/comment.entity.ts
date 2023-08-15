import { schema, types } from "papr"
import { papr } from "../../lib/mongo"

const commentSchema = schema({
  id: types.string({ required: true }),
  username: types.string({ required: true }),
  comment: types.string({ required: true }),
  videoId: types.string({ required: true }),
  createdAt: types.date({ required: true }),
})

export type CommentDocument = (typeof commentSchema)[0]

const Comment = papr.model("comments", commentSchema)

export default Comment
