export type Category = "Live" | "Eksplor" | "Promo"

export interface Video {
  id: string
  category: Category
  title: string
  channel: string
  image: string
  url: string
  views: number
  createdAt: string
}

export interface Product {
  id: string
  videoId: Video["id"]
  name: string
  image: string
  price: number
  url: string
}
