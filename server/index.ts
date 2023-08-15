import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import mongoConnect from "./lib/mongo"
import videoRouter from "./routers/video.router"
import cors from "cors"
import productRouter from "./routers/product.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.use(
  cors((req, callback) => {
    const allowlist = ["http://localhost:5173", "https://tokoplay.netlify.app"]
    const origin = req.header("Origin")
    if (!origin || allowlist.indexOf(origin) === -1) {
      return callback(null, { origin: false })
    } else {
      return callback(null, { origin: true })
    }
  })
)

app.use(express.json())

app.use("/v1", videoRouter)
app.use("/v1", productRouter)

mongoConnect(process.env.DB_URL, "tokoplay", () => {
  server
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated")
    process.kill(process.pid, "SIGTERM")
  })
})
