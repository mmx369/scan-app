import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import Measure from 'react-measure'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { ReactComponent as CancelSvg } from '../assets/cancel.svg'
import { useCardRatio } from '../hooks/useCardRatio'
import { useOffsets } from '../hooks/useOffsets'
import { useUserMedia } from '../hooks/useUserMedia'
import AppContext from '../store/app-context'
import Loader from './Loader'
import PreviewProduct from './PreviewProduct'
import {
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
  Wrapper,
} from './styles/Camera'
import { Button } from './ui/Button'

export interface CaptureOptions {
  audio: boolean
  video: { facingMode: 'environment' }
}

const CAPTURE_OPTIONS: CaptureOptions = {
  audio: false,
  video: { facingMode: 'environment' },
}

export default function Camera() {
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
  const [isShowPreviewProduct, setIsShowPreviewProduct] = useState(false)

  const unique_id = uuid()
  const small_id = unique_id.slice(0, 5)

  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  )

  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  const handleResize = (contentRect: any) => {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    })
  }

  const handleCanPlay = () => {
    calculateRatio(videoRef.current?.videoHeight, videoRef.current?.videoWidth)
    setIsVideoPlaying(true)
    videoRef.current!.play()
  }

  const onCapture = async (blob: any) => {
    setIsLoading(true)
    // setIsShowCamera(false)
    const file = new File([blob], `${small_id}.jpg`, { type: 'image/jpeg' })
    const upload_url_test = 'https://klishevich.com'
    // const upload_url_test = 'http://localhost:5000'
    // const upload_url = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/images'
    // const getDataUrl = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/products?imageId='
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    try {
      const delay = (time: number) =>
        new Promise((resolve, reject) => setTimeout(resolve, time))
      // to google_api
      // const response = await axios.post<any>(`${upload_url}`, formData, config)
      // const { imageId } = response.data
      // console.log('IMAGE_ID', response.data.imageId)
      // await delay(3000)
      // const product = await axios.get<any>(`${getDataUrl}${imageId}`)
      // console.log('PRODUCT: ', product)

      //to my_test_api
      const response = await axios.post<string>(
        `${upload_url_test}/upload`,
        formData,
        config
      )
      await delay(3000)
      const product = await axios.post(`${upload_url_test}/find`, response)
      appCtx.addProduct(product.data)
      setIsShowPreviewProduct(true)
      setIsLoading(false)
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  const handleCapture = () => {
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
    <div>
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
                  <Overlay hidden={!isVideoPlaying}>
                    <OverlayTopLeftCorner />
                    <OverlayTopRightCorner />
                    <OverlayBottomLeftCorner />
                    <OverlayBottomRightCorner />
                  </Overlay>
                  <Canvas
                    ref={canvasRef}
                    width={container.width}
                    height={container.height}
                    style={{ opacity: 0 }}
                  />
                  <Flash
                    //@ts-ignore
                    flash={isFlashing}
                    onAnimationEnd={() => setIsFlashing(false)}
                  />
                </Container>
                {isVideoPlaying && (
                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      onClick={isCanvasEmpty ? handleCapture : handleClear}
                    >
                      сделать снимок
                    </Button>
                    <Footer>
                      <div style={{ width: '60%', paddingLeft: '8px' }}>
                        Расположите товар в рамке так чтобы было видно этикетку.
                      </div>
                      <CancelSvg
                        onClick={() => navigate('/cart')}
                        style={{ marginRight: '8px' }}
                      />
                    </Footer>
                  </div>
                )}
              </Wrapper>
            )}
          </Measure>
        </div>
      )}
      {isLoading && <Loader />}
      {isShowPreviewProduct && !isLoading && (
        <PreviewProduct setIsShowPreviewProduct={setIsShowPreviewProduct} />
      )}
    </div>
  )
}
