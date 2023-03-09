import { motion } from 'framer-motion'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CancelSvg } from '../assets/cancel.svg'
import AppContext, { IAppContext } from '../store/app-context'
import { IProduct } from '../types/Product'
import Button from '../ui/Button'

import classes from './Product.module.css'

export default function ProductPage() {
  const appCtx = useContext<IAppContext>(AppContext)
  const navigate = useNavigate()
  const product = appCtx.currentProduct as IProduct

  const handleCancel = () => {
    navigate('/cart')
  }

  const cartItemAddhandler = (item: IProduct) => {
    appCtx.addItemToCart(item)
    navigate('/cart')
  }

  return (
    <motion.div
      className={classes.container}
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.6 } }}
    >
      <div className={classes.title}>{product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product.article}`}</div>
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
            children={`${product.price} ₸ +`}
            className='btn__product'
            typeButton='button'
            onClick={cartItemAddhandler.bind(null, product)}
          />
        </div>
        <div className={classes.action__icon} onClick={handleCancel}>
          <CancelSvg />
        </div>
      </div>
    </motion.div>
  )
}
