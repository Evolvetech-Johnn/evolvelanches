import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Checkout from "../pages/Checkout/Checkout";
import Admin from "../pages/Admin/Admin";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/Product/ProductDetails";
import Menu from "../pages/Menu/Menu";
import Promotions from "../pages/Promotions/Promotions";

import AdminLayout from "../pages/Admin/AdminLayout";
import OrderManager from "../pages/Admin/OrderManager";
import Financials from "../pages/Admin/Financials";
import Inventory from "../pages/Admin/Inventory";
import Metrics from "../pages/Admin/Metrics";
import ProductForm from "../pages/Admin/ProductForm";
import RawMaterials from "../pages/Admin/RawMaterials";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Menu />} />
        <Route path="promocoes" element={<Promotions />} />
        <Route path="produto/:id" element={<ProductDetails />} />
        <Route path="carrinho" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Register />} />

        {/* Admin Routes - Protected */}
        <Route
          path="admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} /> {/* Default Dashboard */}
          <Route path="produtos/novo" element={<ProductForm />} />
          <Route path="produtos/editar/:id" element={<ProductForm />} />
          <Route path="pedidos" element={<OrderManager />} />
          <Route path="financeiro" element={<Financials />} />
          <Route path="cardapio" element={<Inventory />} />
          <Route path="estoque" element={<RawMaterials />} />
          <Route path="metricas" element={<Metrics />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route
          path="*"
          element={
            <div className="container" style={{ padding: "2rem" }}>
              <h2>Página não encontrada</h2>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
