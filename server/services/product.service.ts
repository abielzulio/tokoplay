import { ProductRepository } from "../domains/product/product.repository"

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  public async createProduct(
    payload: Parameters<ProductRepository["createProduct"]>[0]
  ): ReturnType<ProductRepository["createProduct"]> {
    try {
      await this.productRepository.createProduct(payload)
    } catch (error) {
      throw error
    }
  }

  public async getProductsByVideoId(
    videoId: Parameters<ProductRepository["getProductsByVideoId"]>[0]
  ): ReturnType<ProductRepository["getProductsByVideoId"]> {
    try {
      const products = await this.productRepository.getProductsByVideoId(
        videoId
      )
      return products
    } catch (error) {
      throw error
    }
  }
}
