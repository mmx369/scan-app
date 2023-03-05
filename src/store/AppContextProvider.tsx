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
    console.log('action', action)
    const { product: newProduct } = action
    console.log(7878, newProduct)
    const yyy = { ...state, currentProduct: { ...newProduct } }
    console.log(9494949, yyy)
    return { ...state, currentProduct: { ...newProduct } }
  }

  if (action.type === 'CLEAR_PRODUCT') {
    return { ...state, currentProduct: {} }
  }

  if (action.type === 'ADD_ITEM_TO_CART') {
    console.log('ACTION ', action)
    let updatedItems = state.cart.concat(action.item)
    return { ...state, cart: updatedItems }
  }

  return defaultAppState
}

export const AppContextProvider = (props: any) => {
  const [appState, dispatchAppAction] = useReducer(appReducer, defaultAppState)

  const addProductHandler = (product: any) => {
    dispatchAppAction({ type: 'ADD_PRODUCT', product })
  }

  const clearProductHandler = () => {
    dispatchAppAction({ type: 'CLEAR_PRODUCT' })
  }

  const addItemToCartHandler = (item: IProduct) => {
    console.log('ITEMS', item)
    dispatchAppAction({ type: 'ADD_ITEM_TO_CART', item })
  }

  const appContext = {
    cart: appState.cart,
    currentProduct: appState.currentProduct,
    addProduct: addProductHandler,
    clearProduct: clearProductHandler,
    addItemToCart: addItemToCartHandler,
  }

  return (
    //@ts-ignore
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  )
}
