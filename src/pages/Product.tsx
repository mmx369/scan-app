import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CancelSvg } from '../assets/cancel.svg'
import AppContext, { IAppContext } from '../store/app-context'
import { IProduct } from '../types/Product'
import Button from '../ui/Button'

export default function ProductPage() {
  const appCtx = useContext<IAppContext>(AppContext)
  const navigate = useNavigate()
  const product = appCtx.currentProduct as IProduct

  const handleCancel = () => {
    console.log('to Cart')
    navigate('/cart')
  }

  const cartItemAddhandler = (item: IProduct) => {
    appCtx.addItemToCart(item)
    navigate('/cart')
  }

  return (
    <div>
      <div>
        <h2>{product.title}</h2>
      </div>
      <div>{`Артикул: ${product.item}`}</div>
      <div>{`Масса: ${product.weight} ${product.measure}`}</div>
      <div>
        <div>{product.kkal} ККал</div>
        <div>{product.protein} Белки</div>
        <div>{product.fats} Жиры</div>
        <div>{product.carbohydrates} Углеводы</div>
      </div>
      <div>{product.description}</div>
      <Button
        children={`${product.price} ₸ +`}
        typeButton='button'
        onClick={cartItemAddhandler.bind(null, product)}
      />
      <span onClick={handleCancel}>
        <CancelSvg />
      </span>
    </div>
  )
}
