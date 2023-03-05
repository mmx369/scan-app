import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import ScanPage from './pages/Scan'
import Scanning from './pages/Scanning'
import { AppContextProvider } from './store/AppContextProvider'
import { GlobalStyle } from './styles/global'

const router = createBrowserRouter([
  { index: true, element: <HomePage /> },
  { path: '/scan', element: <ScanPage /> },
  { path: '/scanning', element: <Scanning /> },
  { path: '/product', element: <Product /> },
  // { path: 'cart', element: <Cart /> },
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
