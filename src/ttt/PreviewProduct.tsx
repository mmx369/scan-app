import { useContext } from 'react'
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

  const navigateHandler = () => {
    navigate('/cart')
  }

  const handleCancel = () => {
    setIsShowPreviewProduct(false)
    navigate('/cart')
  }

  const cartItemAddhandler = (item: IProduct) => {
    appCtx.addItemToCart(item)
    navigate('/cart')
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>{product.title}</div>
      <div className={classes.title__second}>
        <div>{`Артикул: ${product.article}`}</div>
        <div>{`Масса: ${product.weight} гр.`}</div>
      </div>
      <hr
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: '3px',
          marginBottom: '3px',
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
    </div>
  )
}
