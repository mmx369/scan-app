import { useContext, useState } from 'react'
import AppContext from '../store/app-context'
import classes from './ProductDetail.module.css'
import { Button } from './ui/Button'

type TProps = {
  productId: string
  setIsShowProduct: (x: boolean) => void
}

export default function ProductDetail({ productId, setIsShowProduct }: TProps) {
  const appCtx = useContext(AppContext)
  const [product] = appCtx.cart.filter((item) => item.id === productId)

  const [isVisible, setIsVisible] = useState(true)

  const cartItemRemoveHandler = (id: string) => {
    setIsVisible(false)
    setTimeout(() => {
      appCtx.removeItemFromCart(id)
      setIsShowProduct(false)
    }, 300)
  }

  return (
    <div className={isVisible ? `${classes.container}` : `${classes.container} ${classes.down}`}>
      <div className={classes.title}>{product && product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product && product.article}`}</div>
        <div>{`Масса: ${product && product.weight} гр.`}</div>
      </div>
      <hr style={{ marginLeft: '15px', marginRight: '15px' }} />
      <div className={classes.nutrition}>
        <div className={classes.nutrition__block}>
          <strong>{product && product.kkal}</strong>
          <div>ККал</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product && product.protein}</strong>
          <div>Белки</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product && product.fats}</strong> <div>Жиры</div>
        </div>
        <div className={classes.nutrition__block}>
          <strong>{product && product.carbohydrates}</strong> <div>Углеводы</div>
        </div>
      </div>
      <div className={classes.description}>{product && product.description}</div>
      <div className={classes.action}>
        <div className={classes.action__button}>
          <Button children='Удалить из корзины' typeButton='button' className='btn__delete' onClick={cartItemRemoveHandler.bind(null, productId!)} />
        </div>
      </div>
    </div>
  )
}
