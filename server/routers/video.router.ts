import express from "express"
import * as VideoController from "../controllers/video.controller"

const videoRouter = express.Router()

videoRouter.post("/videos", VideoController.createVideo)
videoRouter.get("/videos", VideoController.getAllVideos)

export default videoRouter
