import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../store/app-context'
import Button from '../ui/Button'

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const appCtx = useContext(AppContext)

  const [product] = appCtx.cart.filter((item) => item.id === productId)

  console.log('PARAMS', productId)

  const cartItemRemoveHandler = (id: string) => {
    appCtx.removeItemFromCart(id)
    navigate('/cart')
  }

  return (
    <div>
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
          children='Удалить из корзины'
          typeButton='button'
          onClick={cartItemRemoveHandler.bind(null, productId!)}
        />
      </div>
      ProductDetailPage ID: {productId}
    </div>
  )
}
