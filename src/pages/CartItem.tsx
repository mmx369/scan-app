type TProps = {
  id: string
  title: string
  weight: number
  measure: string
  item: string
  kkal: number
  protein: number
  fats: number
  carbohydrates: number
  description: string
  price: number
}

const CartItem = ({
  id,
  title,
  weight,
  measure,
  item,
  kkal,
  protein,
  fats,
  carbohydrates,
  description,
  price,
}: TProps) => {
  return (
    <li>
      <div>
        <h2>{title}</h2>
        <div>
          <span>{price}</span>
        </div>
      </div>
      <div>
        <button onClick={() => {}}>−</button>
        <button onClick={() => {}}>+</button>
      </div>
    </li>
  )
}

export default CartItem
