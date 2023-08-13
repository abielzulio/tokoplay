import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import mongoConnect from "./lib/mongo"
import videoRouter from "./routers/video.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.use(express.json())

app.use("/v1", videoRouter)

mongoConnect(process.env.DB_URL, "tokoplay", () => {
  server
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated")
    process.kill(process.pid, "SIGTERM")
  })
})