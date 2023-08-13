import { nanoid } from "nanoid"
import Video, { VideoDocument } from "./video.entity"
import { WithId } from "mongodb"

export class VideoRepository {
  public async createVideo(
    payload: Omit<VideoDocument, "id" | "createdAt" | "_id">
  ): Promise<void> {
    try {
      const newVideo: Omit<VideoDocument, "_id"> = {
        id: nanoid(),
        createdAt: new Date(),
        ...payload,
      }
      await Video.insertOne(newVideo)
    } catch (error) {
      throw error
    }
  }

  public async getAllVideos(): Promise<WithId<Pick<VideoDocument, "_id">>[]> {
    try {
      const videos = Video.find({}, { projection: { _id: 0 } })
      return videos
    } catch (error) {
      throw error
    }
  }
}
