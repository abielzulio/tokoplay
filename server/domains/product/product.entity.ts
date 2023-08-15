import { schema, types } from "papr"
import { papr } from "../../lib/mongo"

const productSchema = schema({
  id: types.string({ required: true }),
  videoId: types.string({ required: true }),
  name: types.string({ required: true }),
  image: types.string({ required: true }),
  price: types.number({ required: true }),
  url: types.string({ required: true }),
})

export type ProductDocument = (typeof productSchema)[0]

const Product = papr.model("products", productSchema)

export default Product
