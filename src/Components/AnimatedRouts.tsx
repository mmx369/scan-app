import { Route, Routes, useLocation } from 'react-router-dom'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import HomePage from '../pages/HomePage'
import Product from '../pages/Product'
import ProductDetailPage from '../pages/ProductDetailPage'
import Scanning from '../pages/Scanning'

import { AnimatePresence } from 'framer-motion'

export default function AnimatedRouts() {
  const location = useLocation()

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='scanning' element={<Scanning />} />
        <Route path='product' element={<Product />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='cart' element={<Cart />} />
        <Route path='cart/:productId' element={<ProductDetailPage />} />
      </Routes>
    </AnimatePresence>
  )
}
