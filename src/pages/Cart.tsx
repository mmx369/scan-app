import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import { ReactComponent as CameraIconSvg } from '../assets/camera.svg'
import { ReactComponent as ExitSvg } from '../assets/exit.svg'
import AppContext from '../store/app-context'
import Button from '../ui/Button'
import CartItem from './CartItem'

export default function Cart() {
  const cartCtx = useContext(AppContext)
  const navigate = useNavigate()

  const cartItems = (
    <ul>
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
    </ul>
  )

  return (
    <>
      <div>
        <span>
          <BuySvg /> Buy
        </span>
        <div>
          <ExitSvg />
        </div>
        <h3>МОИ ТОВАРЫ</h3>
      </div>
      {cartItems}
      {cartCtx.cart.length !== 0 && (
        <div>
          <Button
            children='Перейти к оплате'
            typeButton='button'
            onClick={() => navigate('/checkout')}
          />
          <Button
            children='+'
            typeButton='button'
            onClick={() => navigate('/scanning')}
          />
        </div>
      )}
      {cartCtx.cart.length === 0 && (
        <div>
          <Button
            children='Сканировать'
            icon={CameraIconSvg}
            typeButton='button'
            onClick={() => navigate('/scanning')}
          />
        </div>
      )}
    </>
  )
}
