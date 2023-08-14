type TokoplayResponseMeta = {
  meta: {
    status: number
    message?: string
  }
}

export type TokoplayResponseData<T = unknown> = TokoplayResponseMeta & {
  data: T
}
