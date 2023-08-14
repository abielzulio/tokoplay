import type { Request, Response } from "express"
import { VideoDocument } from "../domains/video/video.entity"
import { VideoService } from "../services/video.service"

type CreateVideoBodyRequest = Pick<VideoDocument, "channel" | "title" | "url">
type GetVideosByIdParamsRequest = Pick<VideoDocument, "id">

export const createVideo = async (
  req: Request<{}, {}, CreateVideoBodyRequest>,
  res: Response
) => {
  try {
    const { channel, title, url } = req.body
    if (!channel || !title || !url) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: `Missing required body`,
        },
      })
    }

    const videoService = new VideoService()
    const video = await videoService.createVideo(req.body)
    res.status(201).json({ meta: { status: 201 }, data: video })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}

export const getVideoById = async (
  req: Request<GetVideosByIdParamsRequest, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params
    const videoService = new VideoService()
    const video = await videoService.getVideoById(id)
    if (!video) {
      return res.status(404).json({
        meta: {
          status: 404,
          message: `Video with id ${id} not found`,
        },
      })
    }
    res.status(200).json({ meta: { status: 200 }, data: video })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}

export const getAllVideos = async (_: Request, res: Response) => {
  try {
    const videoService = new VideoService()
    const videos = await videoService.getAllVideos()
    res.status(200).json({ meta: { status: 200 }, data: videos })
  } catch (error) {
    res
      .status(500)
      .json({ meta: { status: 500, message: (error as Error).message } })
  }
}
