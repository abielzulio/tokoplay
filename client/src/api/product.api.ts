import ky from "ky"
import { KY_CONFIG, handleResponse } from "."
import { Product } from "../types/tokoplay"

export const fetchProducts = async (id: string): Promise<Product[]> => {
  const response = await ky.get(`products/${id}`, KY_CONFIG)

  return await handleResponse<Product[]>(response)
}
