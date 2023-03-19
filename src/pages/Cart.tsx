import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import camSvg from '../assets/camera.svg'
import { ReactComponent as ExitSvg } from '../assets/exit.svg'
import CartItem from '../components/CartItem'
import ProductDetail from '../components/ProductDetail'
import { Button } from '../components/ui/Button'
import AppContext from '../store/app-context'

import classes from './Cart.module.css'

export default function Cart() {
  const cartCtx = useContext(AppContext)
  const navigate = useNavigate()
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [productId, setProductId] = useState('')

  const openDetailHandler = (id: string) => {
    setProductId(id)
    setIsShowProduct(true)
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
              <Button icon={camSvg} children='Сканировать' typeButton='button' className='btn__plus_scan' onClick={() => navigate('/scanning')} />
            </div>
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
                <Button children='+' icon={camSvg} typeButton='button' className='btn__plus_scan_sm' onClick={() => navigate('/scanning')} />
              </div>
            </div>
            <div className={classes.footer_img}>
              <BottomLineSvg />
            </div>
          </div>
        </>
      )}

      {isShowProduct && <ProductDetail productId={productId} setIsShowProduct={setIsShowProduct} />}
    </motion.div>
  )
}
