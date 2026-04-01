import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Collection from "./pages/Collection"
import Products from "./pages/Products"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PageNotFound from "./pages/PageNotFound"
import UDashboard from "./pages/user/UDashboard"
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"


function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<UDashboard/>}/>
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>

          </Route>
          
          <Route path="/about" element={<About/>}/>
          <Route path="/collection" element={<Collection/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
