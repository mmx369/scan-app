import { useCallback, useState } from 'react'

export function useCardRatio(initialRatio: any) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio)

  const calculateRatio = useCallback((height: number, width: number) => {
    if (height && width) {
      const isPortrait = height >= width
      const ratio = isPortrait ? width / height : height / width
      setAspectRatio(ratio)
    }
  }, [])

  return [aspectRatio, calculateRatio]
}
