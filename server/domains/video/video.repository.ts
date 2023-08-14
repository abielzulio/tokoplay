import { WithId } from "mongodb"
import * as Youtube from "../../utils/youtube"
import Video, { VideoDocument } from "./video.entity"
import { randomizeCategory } from "../../utils"

export class VideoRepository {
  public async createVideo(
    payload: Omit<
      VideoDocument,
      "id" | "image" | "createdAt" | "_id" | "category"
    >
  ): Promise<void> {
    try {
      const id = Youtube.getId(payload.url)
      const image = Youtube.getThumbnail(id)
      const category = randomizeCategory()
      const newVideo: Omit<VideoDocument, "_id"> = {
        id,
        image,
        category,
        createdAt: new Date(),
        ...payload,
      }
      await Video.insertOne(newVideo)
    } catch (error) {
      throw error
    }
  }

  public async getVideoById(
    id: string
  ): Promise<WithId<Pick<VideoDocument, "_id">> | null> {
    try {
      const video = Video.findOne({ id }, { projection: { _id: 0 } })
      return video
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
