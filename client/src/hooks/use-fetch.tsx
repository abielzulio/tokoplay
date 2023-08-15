import { useEffect, useState } from "react"

interface FetchState<T> {
  data: T | undefined
  error: string | undefined
  isLoading: boolean
}

function useFetch<T>(fetchFunction: () => Promise<T>): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: undefined,
    error: undefined,
    isLoading: true,
  })

  useEffect(() => {
    fetchFunction()
      .then((data) => {
        setFetchState({ data, error: undefined, isLoading: false })
      })
      .catch((error) => {
        setFetchState({
          data: undefined,
          error: error.message || "An error occurred",
          isLoading: false,
        })
      })
  }, [])

  return fetchState
}

export default useFetch
