import { useEffect, useState } from "react"
import randomize from "../utils/random"

function useVideo() {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, randomize(300))
  }, [])

  return {
    isLoading,
  }
}

export default useVideo
