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
import Layout from "./common/components/Layout"
import PersistLogin from "./modules/auth/components/PersistLogin"
import RequireAuth from "./common/components/RequireAuth"
import AdminLayout from "./modules/admin/components/AdminLayout"
import { Role } from "./common/hooks/useAuth"
import Brand from "./modules/admin/brand/Brand"
import Category from "./modules/admin/category/Category"
import Shipper from "./modules/admin/shipper/Shipper"
import Variation from "./modules/admin/variation/Variation"
function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth/:role/:method" element={<Auth />} />
      <Route element={<PersistLogin />} >
        <Route path="/" element={<Layout />} >
          <Route path="/cart" element={<Cart />} />
          <Route path="/company" element={<Company />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/question" element={<Question />} />
          <Route path="/review" element={<Review />} />
          <Route element={<RequireAuth allowedRoles={Role.Admin} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/brand" element={<Brand />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/company" element={<Company />} />
              <Route path="/admin/shipper" element={<Shipper />} />
              <Route path="/admin/variation" element={<Variation />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
