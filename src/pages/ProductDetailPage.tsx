import { motion } from 'framer-motion'
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
  const cartItemRemoveHandler = (id: string) => {
    appCtx.removeItemFromCart(id)
    navigate('/cart')
  }

  return (
    <motion.div
      className={classes.root}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={classes.container}>
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
            <Button
              children='Удалить из корзины'
              typeButton='button'
              className='btn__delete'
              onClick={cartItemRemoveHandler.bind(null, productId!)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
