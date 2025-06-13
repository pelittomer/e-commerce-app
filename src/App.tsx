import { Route, Routes } from "react-router"
import Home from "./modules/home/page"
import Auth from "./modules/auth/page"
import Cart from "./modules/cart/page"
import Company from "./modules/company/page"
import Favorite from "./modules/favorite/page"
import Order from "./modules/order/page"
import Product from "./modules/product/page"
import ProductDetail from "./modules/product-details/page"
import Profile from "./modules/profile/page"
import Question from "./modules/question/page"
import Review from "./modules/review/page"

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/company" element={<Company />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/order" element={<Order />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product-detail" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/question" element={<Question />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  )
}

export default App
