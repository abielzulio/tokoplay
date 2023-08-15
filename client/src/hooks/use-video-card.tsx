import { useEffect, useState } from "react"
import randomize from "../utils/random"

function useVideoCard() {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, randomize(100))
  }, [])

  return {
    isLoading,
  }
}

export default useVideoCard
