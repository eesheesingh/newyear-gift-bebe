import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main'
import Successful from './pages/Successful'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductListing from './pages/ProductListing'
import Welcome from './pages/Welcome'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Main />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
