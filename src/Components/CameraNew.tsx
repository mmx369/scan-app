import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import Measure from 'react-measure'
import { useNavigate } from 'react-router-dom'
import { useCardRatio } from '../hooks/useCardRatio'
import { useOffsets } from '../hooks/useOffsets'
import { useUserMedia } from '../hooks/useUserMedia'
import AppContext from '../store/app-context'

import {
  Canvas,
  Container,
  Flash,
  Overlay,
  Video,
  Wrapper,
} from '../styles/camera'
import { IProduct } from '../types/Product'
import Button from '../ui/Button'

export interface CaptureOptions {
  audio: boolean
  video: { facingMode: 'environment' }
}

const CAPTURE_OPTIONS: CaptureOptions = {
  audio: false,
  video: { facingMode: 'environment' },
}

export default function CameraNew() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const appCtx = useContext(AppContext)

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true)
  const [container, setContainer] = useState({ width: 0, height: 0 })
  const [isFlashing, setIsFlashing] = useState(false)
  const [aspectRatio, calculateRatio] = useCardRatio(0.75)

  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  )

  const mediaStream = useUserMedia(CAPTURE_OPTIONS) //get stream

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  function handleResize(contentRect: any) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    })
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current?.videoHeight, videoRef.current?.videoWidth)
    setIsVideoPlaying(true)
    videoRef.current!.play()
  }

  const onCapture = (blob: any) => {
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })
    const upload_url = 'https://klishevich.com/upload'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    axios
      .post(upload_url, formData, config)
      .then((response: { data: IProduct }) => {
        appCtx.addProduct(response.data)
        navigate('/product')
      })
      .catch((err) => {
        throw new Error('Something went wrong')
      })
  }

  function handleCapture() {
    const context = canvasRef.current?.getContext('2d')
    if (context == null) throw new Error('Could not get context')
    context.drawImage(
      videoRef.current!,
      offsets.x,
      offsets.y,
      container.width - 20,
      container.height - 100,
      0,
      0,
      container.width - 20,
      container.height - 100
    )
    canvasRef.current?.toBlob((blob) => onCapture(blob), 'image/jpeg', 1)
    setIsCanvasEmpty(false)
    setIsFlashing(true)
    setIsVideoPlaying(false)
  }

  function handleClear() {
    const context = canvasRef.current?.getContext('2d')
    if (context == null) throw new Error('Could not get context')
    context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
    setIsCanvasEmpty(true)
  }

  function handleSendPicture() {
    console.log('Sending...')
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
            //@ts-ignore
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            style={{
              height: `${container.height}px`,
            }}
          >
            <Video
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`,
              }}
            />
            <Overlay hidden={!isVideoPlaying} />
            <Canvas
              ref={canvasRef}
              width={container.width}
              height={container.height}
            />
            <Flash
              //@ts-ignore
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>
          {isVideoPlaying && (
            <>
              <Button onClick={isCanvasEmpty ? handleCapture : handleClear}>
                {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
              </Button>
            </>
          )}
          {!isVideoPlaying && (
            <Button onClick={handleSendPicture}>Send pictures</Button>
          )}
        </Wrapper>
      )}
    </Measure>
  )
}
