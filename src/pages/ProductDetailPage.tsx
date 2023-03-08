import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../store/app-context'
import Button from '../ui/Button'

import classes from './ProductDetailPage.module.css'

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
    <div className={classes.container}>
      <div className={classes.title}>{product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product.item}`}</div>
        <div>{`Масса: ${product.weight} ${product.measure}`}</div>
      </div>
      <hr />
      <div className={classes.nutrition}>
        <div className={classes.nutrition__block}>
          <strong>{product.kkal}</strong>
          <div>ККал</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product.protein}</strong>
          <div>Белки</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product.fats}</strong> <div>Жиры</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product.carbohydrates}</strong> <div>Углеводы</div>
        </div>
      </div>
      <div className={classes.description}>{product.description}</div>
      <div className={classes.action}>
        <div className={classes.action__button}>
          <Button
            children='Удалить из корзины'
            typeButton='button'
            className='btn__delete'
            onClick={cartItemRemoveHandler.bind(null, productId!)}
          />
        </div>
      </div>
    </div>
  )
}
