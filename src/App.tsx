import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ErrorPage from './pages/Error'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import ProductDetailPage from './pages/ProductDetailPage'
import Scanning from './pages/Scanning'
import { AppContextProvider } from './store/AppContextProvider'
import { GlobalStyle } from './styles/global'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'scanning', element: <Scanning /> },
      { path: 'product', element: <Product /> },
      { path: 'checkout', element: <Checkout /> },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'cart/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <AppContextProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  )
}

export default App
