import { Navigate, Route, Routes } from "react-router-dom";

import AdminRoute from "./components/common/AdminRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import StoreLayout from "./components/layout/StoreLayout";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import Cart from "./pages/store/Cart";
import Checkout from "./pages/store/Checkout";
import ProductDetails from "./pages/store/ProductDetails";
import Products from "./pages/store/Products";
import Users from "./pages/dashboard/Users";
import Overview from "./pages/dashboard/Overview";
import CartsManagement from "./pages/dashboard/CartsManagement";
import Home from "./pages/store/Home";



function App() {
  return (
    <Routes>
      {/* Store Routes */}
      <Route element={<StoreLayout />}>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="carts" element={<CartsManagement />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
