import { createContext } from 'react'
import { IProduct } from '../types/Product'

export interface IAppContext {
  currentProduct: IProduct | {}
  cart: IProduct[]
  addProduct: (product: IProduct) => void
  clearProduct: () => void
  addItemToCart: (item: IProduct) => void
}

const AppContext = createContext<IAppContext>({
  currentProduct: {},
  cart: [],
  addProduct: () => {},
  clearProduct: () => {},
  addItemToCart: () => {},
})

export default AppContext
