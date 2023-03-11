import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import Measure from 'react-measure'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.gif'
import { useCardRatio } from '../hooks/useCardRatio'
import { useOffsets } from '../hooks/useOffsets'
import { useUserMedia } from '../hooks/useUserMedia'
import AppContext from '../store/app-context'

import { CancelBtn, Canvas, Container, Flash, Footer, LoaderOverlay, Overlay, Video, Wrapper } from '../styles/camera'
import { IProduct } from '../types/Product'
import Button from '../ui/Button'

export interface CaptureOptions {
  audio: boolean
  video: { facingMode: 'environment' }
}

const CAPTURE_OPTIONS: CaptureOptions = {
  audio: false,
  video: { facingMode: 'environment' }
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
  const [isLoading, setIsLoading] = useState(false)
  const [isShowCamera, setIsShowCamera] = useState(true)

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
      height: Math.round(contentRect.bounds.width / aspectRatio)
    })
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current?.videoHeight, videoRef.current?.videoWidth)
    setIsVideoPlaying(true)
    videoRef.current!.play()
  }

  const onCapture = async (blob: any) => {
    setIsLoading(true)
    setIsShowCamera(false)
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })
    const upload_url = 'https://klishevich.com'
    // const upload_url = 'http://localhost:5000'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    try {
      const response = await axios.post<string>(`${upload_url}/upload`, formData, config)
      const product = await axios.post<IProduct>(`${upload_url}/find`, response, { headers: { 'Content-Type': 'application/json' } })
      appCtx.addProduct(product.data)
      navigate('/product')
      setIsLoading(false)
    } catch (error) {
      throw new Error('Something went wrong')
    }
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

  console.log(8787, videoRef.current?.videoHeight, videoRef.current?.videoWidth)

  return (
    <>
      {isShowCamera && (
        <div style={{ display: 'flex' }}>
          <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
              <Wrapper>
                <Container
                  ref={measureRef}
                  //@ts-ignore
                  maxHeight={videoRef.current && videoRef.current.videoHeight}
                  maxWidth={videoRef.current && videoRef.current.videoWidth}
                  style={{
                    height: `${container.height}px`
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
                      left: `-${offsets.x}px`
                    }}
                  />
                  <Overlay hidden={!isVideoPlaying} />
                  <Canvas ref={canvasRef} width={container.width} height={container.height} />
                  <Flash
                    //@ts-ignore
                    flash={isFlashing}
                    onAnimationEnd={() => setIsFlashing(false)}
                  />
                </Container>
                <div style={{ flexGrow: 1 }} />
                {isVideoPlaying && (
                  <>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                      <Button onClick={isCanvasEmpty ? handleCapture : handleClear}>сделать снимок</Button>
                    </div>
                    <Footer>
                      <div style={{ width: '50%', fontSize: '12px' }}>Расположите товар в рамке так чтобы было видно этикетку.</div>
                      <div style={{ flexGrow: 1 }} />
                      <CancelBtn>X</CancelBtn>
                    </Footer>
                  </>
                )}
              </Wrapper>
            )}
          </Measure>
        </div>
      )}
      {isLoading && (
        <>
          <LoaderOverlay />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ width: '50%' }} src={loader} alt='Loading...' />
          </div>
        </>
      )}
    </>
  )
}
