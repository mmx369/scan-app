import { motion } from 'framer-motion'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import { ReactComponent as CameraIconSvg } from '../assets/camera.svg'
import { ReactComponent as ExitSvg } from '../assets/exit.svg'
import AppContext from '../store/app-context'
import Button from '../ui/Button'
import CartItem from './CartItem'

import classes from './Cart.module.css'

export default function Cart() {
  const cartCtx = useContext(AppContext)
  const navigate = useNavigate()

  const cartItems = (
    <div className={classes.wrapper}>
      {cartCtx.cart.map((item) => (
        <Link to={`/cart/${item.id}`} key={item.id}>
          <CartItem
            title={item.title}
            weight={item.weight}
            measure={item.measure}
            price={item.price}
          />
        </Link>
      ))}
    </div>
  )

  return (
    <motion.div
      className={
        cartCtx.cart.length === 0
          ? classes.container_cartempty
          : classes.container_cart
      }
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.6 } }}
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
      <hr />
      <div className={classes.title}>МОИ ТОВАРЫ</div>

      {cartItems}
      {cartCtx.cart.length !== 0 && (
        <>
          <div className={classes.action}>
            <div className={classes.action__buttons}>
              <div className={classes.action__button}>
                <Button
                  children='Перейти к оплате'
                  className='btn__product'
                  typeButton='button'
                  onClick={() => navigate('/checkout')}
                />
              </div>
              <div className={classes.action__button_2}>
                <Button
                  children='+'
                  typeButton='button'
                  className='btn__plus_scan'
                  onClick={() => navigate('/scanning')}
                />
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
            <div className={classes.upperFooter__text}>
              Пока что товаров нет в корзине. Скорее добавьте новые.
            </div>
          </div>
          <div className={classes.footer}>
            <div className={classes.footer__button}>
              <Button
                children='Сканировать'
                icon={CameraIconSvg}
                typeButton='button'
                onClick={() => navigate('/scanning')}
              />
            </div>
            <div className={classes.footer_img}>
              <BottomLineSvg />
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
