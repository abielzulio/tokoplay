import { useEffect } from "react"

function useScrolltToBottom<T>(ref: React.RefObject<HTMLDivElement>, deps: T) {
  useEffect(() => {
    if (deps) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [deps])
}

export default useScrolltToBottom
