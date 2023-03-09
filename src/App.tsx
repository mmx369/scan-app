import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRouts from './Components/AnimatedRouts'
import { AppContextProvider } from './store/AppContextProvider'
import { GlobalStyle } from './styles/global'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: 'scanning', element: <Scanning /> },
//       { path: 'product', element: <Product /> },
//       { path: 'checkout', element: <Checkout /> },
//       {
//         path: 'cart',
//         element: <Cart />,
//       },
//       {
//         path: 'cart/:productId',
//         element: <ProductDetailPage />,
//       },
//     ],
//   },
// ])

function App() {
  return (
    <>
      <AppContextProvider>
        <Router>
          <AnimatedRouts />
        </Router>
        <GlobalStyle />
        {/* <RouterProvider router={router} /> */}
      </AppContextProvider>
    </>
  )
}

export default App
