import { useEffect, useState } from 'react'
import { CaptureOptions } from '../components/Camera'

export function useUserMedia(requestedMedia: CaptureOptions) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = (await navigator.mediaDevices.getUserMedia(requestedMedia)) as MediaStream
        setMediaStream(stream)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}
