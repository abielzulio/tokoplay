import { schema, types } from "papr"
import { papr } from "../../lib/mongo"

const videoSchema = schema({
  id: types.string({ required: true }),
  title: types.string({ required: true }),
  thumbnail: types.string({ required: true }),
  url: types.string({ required: true }),
  createdAt: types.date({ required: true }),
})

export type VideoDocument = (typeof videoSchema)[0]

const Video = papr.model("video", videoSchema)

export default Video
