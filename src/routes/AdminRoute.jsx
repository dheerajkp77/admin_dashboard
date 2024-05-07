import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProfile from "../admin/AdminProfile";
import Dashboard from "../admin/dashboard/Dashboard";
import AddProduct from "../admin/product/AddProduct";
import Product from "../admin/product/Product";
import ViewProduct from "../admin/product/ViewProduct";
import NotFound from "../components/NotFound";
import "./admin.scss";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ViewProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-product/:id" element={<AddProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AdminRoute;
