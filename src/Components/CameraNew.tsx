import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import Measure from 'react-measure'
import { useNavigate } from 'react-router-dom'
import { useCardRatio } from '../hooks/useCardRatio'
import { useOffsets } from '../hooks/useOffsets'
import { useUserMedia } from '../hooks/useUserMedia'
import ProductPreview from '../pages/ProductPreview'
import AppContext from '../store/app-context'

import {
  CancelBtn,
  Canvas,
  Container,
  Flash,
  Footer,
  Overlay,
  OverlayBottomLeftCorner,
  OverlayBottomRightCorner,
  OverlayTopLeftCorner,
  OverlayTopRightCorner,
  Video,
  Wrapper
} from '../styles/camera'
import Button from '../ui/Button'
import Loader from './Loader'

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
  const [isShowProduct, setIsShowProduct] = useState(false)

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
    // setIsShowCamera(false)
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })
    const upload_url = 'https://klishevich.com'
    // const upload_url = 'http://localhost:5000'
    // const upload_url = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/images'
    // const getDataUrl = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/products?imageId=2'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    try {
      // const response = await axios.post<string>(`${upload_url}`, formData, config)
      // console.log(555, response)
      // const product = await axios.get<IProduct>(`${getDataUrl}`)
      const response = await axios.post<string>(`${upload_url}/upload`, formData, config)
      const product = await axios.post(`${upload_url}/find`, response)
      appCtx.addProduct(product.data)
      setIsShowProduct(true)
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
    // setIsVideoPlaying(false)
  }

  function handleClear() {
    const context = canvasRef.current?.getContext('2d')
    if (context == null) throw new Error('Could not get context')
    context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
    setIsCanvasEmpty(true)
  }

  return (
    <>
      {isShowCamera && (
        <div style={{ display: 'flex', height: '100%' }}>
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
                  <Overlay hidden={!isVideoPlaying}>
                    <OverlayTopLeftCorner />
                    <OverlayTopRightCorner />
                    <OverlayBottomLeftCorner />
                    <OverlayBottomRightCorner />
                  </Overlay>
                  <Canvas ref={canvasRef} width={container.width} height={container.height} style={{ opacity: 0 }} />
                  <Flash
                    //@ts-ignore
                    flash={isFlashing}
                    onAnimationEnd={() => setIsFlashing(false)}
                  />
                </Container>
                {isVideoPlaying && (
                  <>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <Button onClick={isCanvasEmpty ? handleCapture : handleClear}>сделать снимок</Button>
                      </div>
                      <Footer>
                        <div style={{ width: '50%', fontSize: '12px' }}>Расположите товар в рамке так чтобы было видно этикетку.</div>
                        <div style={{ flexGrow: 1 }} />
                        <CancelBtn onClick={() => navigate('/cart')}>X</CancelBtn>
                      </Footer>
                    </div>
                  </>
                )}
              </Wrapper>
            )}
          </Measure>
        </div>
      )}

      {isLoading && <Loader />}
      {isShowProduct && !isLoading && <ProductPreview setIsShowProduct={setIsShowProduct} />}
    </>
  )
}
