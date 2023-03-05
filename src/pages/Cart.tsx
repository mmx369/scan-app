export interface TProduct {
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

export default function Cart() {
  //@ts-ignore
  //   const cartCtx = useContext(AppContext) as TProduct
  //   console.log(5555, cartCtx)
  //   const cartItems = (
  //     <ul>
  //       {cartCtx.cart.map((item) => (
  //         <CartItem
  //           key={item.id}
  //           name={item.name}
  //           amount={item.amount}
  //           price={item.price}
  //           onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //           onAdd={cartItemAddHandler.bind(null, item)}
  //         />
  //       ))}
  //     </ul>
  //   )
  //   return <div>{cartItems}</div>
}
