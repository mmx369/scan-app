import { ReactComponent as MilkSvg } from '../assets/milk.svg'

import classes from './CartItem.module.css'

type TProps = {
  title: string
  weight: number
  price: number
}

const CartItem = ({ title, weight, price }: TProps) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__img}>
        <MilkSvg />
      </div>
      <div className={classes.card__title_wrapper}>
        <div className={classes.card__title}>{title}</div>
        <div style={{ flexGrow: 1 }} />
        <div className={classes.card__title_info}>
          Масса: {weight} гр. <span>{price} ₸</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
