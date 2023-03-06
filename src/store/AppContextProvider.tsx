import { useReducer } from 'react'
import { IProduct } from '../types/Product'
import AppContext from './app-context'

interface IAppState {
  currentProduct: IProduct
  cart: IProduct[]
}

const defaultAppState: IAppState = {
  currentProduct: {
    id: '',
    title: '',
    weight: 0,
    measure: '',
    item: '',
    kkal: 0,
    protein: 0,
    fats: 0,
    carbohydrates: 0,
    description: '',
    price: 0,
  },
  cart: [],
}

const appReducer = (state: any, action: any) => {
  if (action.type === 'ADD_PRODUCT') {
    const { product: newProduct } = action
    return { ...state, currentProduct: { ...newProduct } }
  }

  if (action.type === 'CLEAR_PRODUCT') {
    return { ...state, currentProduct: {} }
  }

  if (action.type === 'ADD_ITEM_TO_CART') {
    let updatedItems = state.cart.concat(action.item)
    return { ...state, cart: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM_FROM_CART') {
    let updatedItems = state.cart.filter(
      (item: IProduct) => item.id !== action.id
    )
    return { ...state, cart: updatedItems }
  }

  return defaultAppState
}

export const AppContextProvider = (props: any) => {
  const [appState, dispatchAppAction] = useReducer(appReducer, defaultAppState)

  const addProductHandler = (product: IProduct) => {
    dispatchAppAction({ type: 'ADD_PRODUCT', product })
  }

  const clearProductHandler = () => {
    dispatchAppAction({ type: 'CLEAR_PRODUCT' })
  }

  const addItemToCartHandler = (item: IProduct) => {
    const newItem = {
      ...item,
      id:
        item.id +
        Math.random()
          .toString()
          .replace(/[\s.,%]/g, ''),
    }
    dispatchAppAction({ type: 'ADD_ITEM_TO_CART', item: newItem })
  }

  const removeItemFromCartHandler = (id: string) => {
    dispatchAppAction({ type: 'REMOVE_ITEM_FROM_CART', id })
  }

  const appContext = {
    cart: appState.cart,
    currentProduct: appState.currentProduct,
    addProduct: addProductHandler,
    clearProduct: clearProductHandler,
    addItemToCart: addItemToCartHandler,
    removeItemFromCart: removeItemFromCartHandler,
  }

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  )
}
