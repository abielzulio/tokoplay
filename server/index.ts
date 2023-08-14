import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import mongoConnect from "./lib/mongo"
import videoRouter from "./routers/video.router"
import cors from "cors"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.use(
  cors((req, callback) => {
    const allowlist = ["http://localhost:5173", "https://tokoplay.netlify.app"]

    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      callback(null, { origin: true })
    } else {
      callback(null, { origin: false })
    }
  })
)

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
