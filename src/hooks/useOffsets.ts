import { useEffect, useState } from 'react'

export function useOffsets(vWidth: number | null, vHeight: number | null, cWidth: number, cHeight: number) {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (vWidth && vHeight && cWidth && cHeight) {
      const x = vWidth > cWidth ? Math.round((vWidth - cWidth) / 2) : 0

      const y = vHeight > cHeight ? Math.round((vHeight - cHeight) / 2) : 0

      setOffsets({ x, y })
    }
  }, [vWidth, vHeight, cWidth, cHeight])

  return offsets
}
