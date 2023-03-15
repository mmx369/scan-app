import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import { ReactComponent as ExitSvg } from '../assets/exit.svg'
import AppContext from '../store/app-context'
import Button from '../ui/Button'
import CartItem from './CartItem'

import camSvg from '../assets/camera.svg'

import classes from './Cart.module.css'
import ProductDetailPage from './ProductDetailPage'

export default function Cart() {
  const cartCtx = useContext(AppContext)
  const navigate = useNavigate()
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [productId, setProductId] = useState('')

  console.log('SHOW', isShowProduct)

  const openDetailHandler = (id: string) => {
    setProductId(id)
    setIsShowProduct(true)
  }

  const cartItems = (
    <div className={classes.wrapper}>
      {cartCtx.cart.map((item) => (
        <div onClick={() => openDetailHandler(item.id)} key={item.id} style={{ width: '100%' }}>
          <CartItem title={item.title} weight={item.weight} measure={item.measure} price={item.price} />
        </div>
      ))}
    </div>
  )

  return (
    <motion.div
      className={classes.root}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <div className={cartCtx.cart.length === 0 ? classes.container_cartempty : classes.container_cart}>
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
        <hr />
        <div className={classes.title}>МОИ ТОВАРЫ</div>

        {cartItems}

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

        {cartCtx.cart.length === 0 && (
          <>
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
      </div>
      {isShowProduct && <ProductDetailPage productId={productId} setIsShowProduct={setIsShowProduct} />}
    </motion.div>
  )
}
