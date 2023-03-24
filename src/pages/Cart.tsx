import axios from 'axios'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import camSvg from '../assets/camera.svg'
import { ReactComponent as ExitSvg } from '../assets/exit.svg'
import CartItem from '../components/CartItem'
import Loader from '../components/Loader'
import PreviewProduct from '../components/PreviewProduct'
import ProductDetail from '../components/ProductDetail'
import { Button } from '../components/ui/Button'
import AppContext from '../store/app-context'
import { IProduct } from '../types/Product'

import ErrorPage from '../components/ErrorPage'
import classes from './Cart.module.css'

export default function Cart() {
  const cartCtx = useContext(AppContext)
  const appCtx = useContext(AppContext)
  const navigate = useNavigate()
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [productId, setProductId] = useState('')
  const [isShowPreviewProduct, setIsShowPreviewProduct] = useState(false)
  const [isShowError, setIsShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  console.log('SHOWPreview', isShowPreviewProduct)

  const unique_id = uuid()

  const openDetailHandler = (id: string) => {
    setProductId(id)
    setIsShowProduct(true)
  }

  const upload_url = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/images'
  // const upload_url_test = 'http://192.168.1.105:5000/images'

  const fileHandler = async (e: any) => {
    if (!e.target.files) {
      return
    }
    setIsLoading(true)
    const small_id = unique_id.slice(0, 5)
    const newFile = e.target.files[0]
    const formData = new FormData()
    formData.append('file', newFile, `${small_id}.jpg`)
    try {
      const product = await axios.post<IProduct>(`${upload_url}`, formData, { timeout: 15000 })
      console.log('Product:', product)
      console.log('Response:', product.data)

      if (product.data.id) {
        appCtx.addProduct(product.data)
        setIsShowPreviewProduct(true)
        setIsLoading(false)
      } else if (product.data.article) {
        setErrorMessage(
          `Продукт успешно распознан, артикул ${product.data.article}, однако к сожалению на настоящий момент в базе отсутствует. Попробуйте другой продукт.`
        )
        setIsShowError(true)
        setIsLoading(false)
      } else if (product.data.title) {
        setErrorMessage(`Продукт ${product.data.title} не распознан, попробуйте сделать фото еще раз`)
        setIsShowError(true)
        setIsLoading(false)
      } else if (!product.data || !product.data.title || !product.data.article) {
        setErrorMessage(`Продукт не распознан, попробуйте сделать фото еще раз`)
        setIsShowError(true)
        setIsLoading(false)
      }
    } catch (error: unknown) {
      setErrorMessage('Что-то пошло не так. Попробуйте позднее.')
      setIsShowError(true)
      setIsLoading(false)
      console.log(error)
    }
  }

  const cartItems = (
    <div className={classes.wrapper}>
      {cartCtx.cart.map((item) => (
        <div onClick={() => openDetailHandler(item.id)} key={item.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CartItem title={item.title} weight={item.weight} price={item.price} />
        </div>
      ))}
    </div>
  )

  return (
    <motion.div
      className={cartCtx.cart.length === 0 ? classes.container : classes.container_cart}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <div className={classes.header}>
        <div className={classes.header__buyicon}>
          <BuySvg /> &nbsp; Buy
        </div>
        <div className={classes.header__exiticon}>
          <Link to={'/'}>
            <ExitSvg />
          </Link>
        </div>
      </div>
      <hr style={{ margin: '5px 8px' }} />
      <div className={classes.title}>МОИ ТОВАРЫ</div>
      {cartItems}
      <div className={classes.flexGrowBlock} />
      {cartCtx.cart.length === 0 && (
        <>
          <div
            style={{
              height: '100%',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className={classes.slide_slow}>
              <div className={classes.inner}>
                <div
                  style={{
                    width: '250px',
                    height: '250px',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    margin: 'auto'
                  }}
                >
                  <div className={classes.topLeft}></div>
                  <div className={classes.topRight}></div>
                  <div className={classes.bottomLeft}></div>
                  <div className={classes.bottomRight}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.upperFooter}>
            <div className={classes.upperFooter__text}>Пока что товаров нет в корзине. Скорее добавьте новые.</div>
          </div>
          <div className={classes.footer}>
            <div className={classes.footer__button}>
              <input
                type='file'
                id='upload'
                onChange={fileHandler}
                accept='image/*'
                capture='environment'
                style={{ display: 'none', opacity: 0, zIndex: -1 }}
              />
              <label htmlFor='upload' className={classes.inputLabel}>
                Сканировать &nbsp; <img src={camSvg} width={25} alt='' />
              </label>
            </div>
            {/* <Button icon={camSvg} children='Сканировать' typeButton='button' className='btn__plus_scan' onClick={() => navigate('/scanning')} /> */}
            <div className={classes.footer_img}>
              <BottomLineSvg />
            </div>
          </div>
        </>
      )}

      {cartCtx.cart.length !== 0 && (
        <>
          <div className={classes.footer}>
            <div className={classes.action__buttons}>
              <div className={classes.action__button}>
                <Button children='Перейти к оплате' className='btn__product' typeButton='button' onClick={() => navigate('/checkout')} />
              </div>
              <div className={classes.action__button_2}>
                <input
                  type='file'
                  id='upload'
                  onChange={fileHandler}
                  accept='image/*'
                  capture='environment'
                  style={{ display: 'none', opacity: 0, zIndex: -1 }}
                />
                <label htmlFor='upload' className={classes.inputLabel} style={{ height: '54px' }}>
                  + &nbsp; <img src={camSvg} width={25} alt='' />
                </label>

                {/* <Button children='+' icon={camSvg} typeButton='button' className='btn__plus_scan_sm' onClick={() => navigate('/scanning')} /> */}
              </div>
            </div>
            <div className={classes.footer_img}>
              <BottomLineSvg />
            </div>
          </div>
        </>
      )}
      {isLoading && <Loader />}
      {isShowPreviewProduct && !isLoading && <PreviewProduct setIsShowPreviewProduct={setIsShowPreviewProduct} />}
      {isShowProduct && <ProductDetail productId={productId} setIsShowProduct={setIsShowProduct} />}
      {isShowError && !isLoading && <ErrorPage setIsShowError={setIsShowError} message={errorMessage} />}
    </motion.div>
  )
}
