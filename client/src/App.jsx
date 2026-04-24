import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import UDashboard from "./pages/user/UDashboard";
import UserLayout from "./components/Layout/UserLayout";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WishList from "./pages/user/WishList";
import Orders from "./pages/user/Orders";
import AdminLayout from "./components/Layout/AdminLayout";
import Users from "./pages/admin/Users";
import ManageCollection from "./pages/admin/ManageCollection";
import ManageProducts from "./pages/admin/ManageProducts";
import AdminProducts from "./pages/admin/AdminProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* user protected route */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserLayout />}>
              <Route index element={<UDashboard />} />
              <Route path="user/wishlist" element={<WishList />} />
              <Route path="user/orders" element={<Orders />} />
           
          </Route>
          </Route>

          {/* admin protected route */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="manage-collection" element={<ManageCollection />} />
              <Route path="manage-product" element={<ManageProducts />} />
              <Route path="product/:slug" element={<UpdateProduct />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
       
        </Route>
      </Routes>
    </div>
  );
}

export default App;
