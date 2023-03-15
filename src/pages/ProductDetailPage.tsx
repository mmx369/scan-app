import { useContext, useState } from 'react'
import AppContext from '../store/app-context'
import Button from '../ui/Button'

import classes from './ProductDetailPage.module.css'

type TProps = {
  productId: string
  setIsShowProduct: (x: boolean) => void
}

export default function ProductDetailPage({ productId, setIsShowProduct }: TProps) {
  const appCtx = useContext(AppContext)
  const [animation, setAnimation] = useState(true)

  const [product] = appCtx.cart.filter((item) => item.id === productId)
  const cartItemRemoveHandler = (id: string) => {
    setAnimation(false)
    setTimeout(() => {
      appCtx.removeItemFromCart(id)
      setIsShowProduct(false)
    }, 600)
  }

  return (
    <div className={`${classes.container} ${animation ? classes.animation__up : classes.animation__down}`}>
      <div className={classes.title}>{product && product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product && product.article}`}</div>
        <div>{`Масса: ${product && product.weight} ${product && product.measure}`}</div>
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
