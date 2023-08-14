import express from "express"
import * as ProducController from "../controllers/product.controller"

const productRouter = express.Router()

productRouter.post("/products/:videoId", ProducController.createProduct)
productRouter.get("/products/:videoId", ProducController.getProductsByVideoId)

export default productRouter
