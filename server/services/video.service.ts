import { VideoRepository } from "../domains/video/video.repository"

export class VideoService {
  private videoRepository: VideoRepository

  constructor() {
    this.videoRepository = new VideoRepository()
  }

  public async createVideo(
    payload: Parameters<VideoRepository["createVideo"]>[0]
  ): ReturnType<VideoRepository["createVideo"]> {
    try {
      await this.videoRepository.createVideo(payload)
    } catch (error) {
      throw error
    }
  }

  public async getVideoById(
    id: Parameters<VideoRepository["getVideoById"]>[0]
  ): ReturnType<VideoRepository["getVideoById"]> {
    try {
      const video = await this.videoRepository.getVideoById(id)
      return video
    } catch (error) {
      throw error
    }
  }

  public async getAllVideos(): ReturnType<VideoRepository["getAllVideos"]> {
    try {
      const videos = await this.videoRepository.getAllVideos()
      return videos
    } catch (error) {
      throw error
    }
  }
}
