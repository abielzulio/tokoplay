import cors from "cors"
import dotenv from "dotenv"
import express, { Express } from "express"
import mongoConnect from "./lib/mongo"
import commentRouter from "./routers/comment.router"
import productRouter from "./routers/product.router"
import videoRouter from "./routers/video.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.use(
  cors((req, callback) => {
    const allowlist = ["http://localhost:5173", "https://tokoplay.zulio.me/"]
    const origin = req.header("Origin")
    if (origin && allowlist.indexOf(origin) !== -1) {
      return callback(null, { origin: true })
    } else {
      return callback(null, { origin: false })
    }
  })
)

app.use(express.json())

app.use("/v1", videoRouter)
app.use("/v1", productRouter)
app.use("/v1", commentRouter)

mongoConnect(process.env.DB_URL, "tokoplay", () => {
  server
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated")
    process.kill(process.pid, "SIGTERM")
  })
})
