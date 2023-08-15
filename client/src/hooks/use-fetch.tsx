import { useState, useEffect } from "react"

interface FetchState<T> {
  data: T | undefined
  error: string | undefined
  isLoading: boolean
}

export interface FetchStateWithMutate<T> extends FetchState<T> {
  mutate: (newData: T) => void
}

function useFetch<T>(fetchFunction: () => Promise<T>): FetchStateWithMutate<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: undefined,
    error: undefined,
    isLoading: true,
  })

  const fetchData = () => {
    setFetchState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

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
  }

  useEffect(() => {
    fetchData()
  }, [])

  const mutate = (newData: T) => {
    setFetchState({
      data: newData,
      error: undefined,
      isLoading: false,
    })
  }

  return { ...fetchState, mutate }
}

export default useFetch
