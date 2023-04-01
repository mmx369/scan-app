import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CancelSvg } from '../assets/cancelRed.svg'
import { Button } from '../components/ui/Button'
import AppContext, { IAppContext } from '../store/app-context'
import { IProduct } from '../types/Product'

import classes from './PreviewProduct.module.css'

type TProps = {
  setIsShowPreviewProduct: (x: boolean) => void
}

export default function PreviewProduct({ setIsShowPreviewProduct }: TProps) {
  const appCtx = useContext<IAppContext>(AppContext)
  const navigate = useNavigate()
  const product = appCtx.currentProduct as IProduct

  const [isVisible, setIsVisible] = useState(true)

  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsShowPreviewProduct(false)
    }, 300)
    // navigate('/cart')
  }

  const cartItemAddhandler = (item: IProduct) => {
    setIsVisible(false)
    appCtx.addItemToCart(item)
    setTimeout(() => {
      setIsShowPreviewProduct(false)
      navigate('/cart')
    }, 300)
  }

  return (
    <div className={isVisible ? `${classes.container}` : `${classes.container} ${classes.down}`}>
      <div className={classes.title}>{product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product.article}`}</div>
        <div>{`Масса: ${product.weight * 1000} гр.`}</div>
      </div>
      <hr
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: '3px',
          marginBottom: '3px'
        }}
      />
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
          <Button children={`${product.price} ₸ +`} className='btn__product' typeButton='button' onClick={cartItemAddhandler.bind(null, product)} />
        </div>
        <div className={classes.action__icon} onClick={handleCancel}>
          <CancelSvg />
        </div>
      </div>
    </div>
  )
}
