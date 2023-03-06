type TProps = {
  title: string
  weight: number
  measure: string
  price: number
}

const CartItem = ({ title, weight, measure, price }: TProps) => {
  return (
    <li>
      <div>
        <div>IMAGE</div>
        <h2>{title}</h2>
        <div>
          Масса: {weight} {measure} <span>{price}₸</span>
        </div>
      </div>
    </li>
  )
}

export default CartItem
