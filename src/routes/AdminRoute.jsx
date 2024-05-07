
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProfile from "../admin/components/adminauth/AdminProfile";
import AdminResetPassword from "../admin/components/adminauth/AdminResetPassword";
import BannerList from "../admin/components/banner-management/BannerList";
import AddBrand from "../admin/components/brand/AddBrand";
import BrandList from "../admin/components/brand/BrandList";
import ViewBrand from "../admin/components/brand/ViewBrand";
import AddCms from "../admin/components/cms/AddCms";
import CmsList from "../admin/components/cms/CmsList";
import ViewCms from "../admin/components/cms/ViewCms";
import EmailQueue from "../admin/components/logger/EmailQueue";
import ErrorLogs from "../admin/components/logger/ErrorLogs";
import LoginActivity from "../admin/components/logger/LoginActivity";
import ViewEmailQueue from "../admin/components/logger/ViewEmailQueue";
import ViewLoginActivity from "../admin/components/logger/ViewLoginActivity";
import AddProduct from "../admin/components/product/AddProduct";
import OrderRequest from "../admin/components/order-request/OrderRequest";
import ViewOrderRequest from "../admin/components/order-request/ViewOrderRequest";
import UserList from "../admin/components/userlist/UserList";
import UserView from "../admin/components/userlist/UserView";
import ViewUserOrder from "../admin/components/userlist/ViewUserOrder";
import Dashboard from "../admin/dashboard/Dashboard";
import NotFound from "../components/NotFound";
import Product from "../admin/components/product/Product";
import './admin.scss'
import ViewProduct from "../admin/components/product/ViewProduct";
import AdminFaq from "../admin/components/faq/AdminFaq";
import AdminAddFaq from "../admin/components/faq/AdminAddFaq";
import AdminViewFaq from "../admin/components/faq/AdminViewFaq";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/change-password" element={<AdminResetPassword />} />

      {/* user section route */}
      <Route path="/user-list" element={<UserList />} />
      <Route path="/banner-list" element={<BannerList />} />
      <Route path="/view-user/:id" element={<UserView />} />
      <Route path="/view-order/:id" element={<ViewUserOrder />} />

      {/* shopper section route  */}
      <Route path="/order-request" element={<OrderRequest />} />
      <Route path="/order-request/:id" element={<ViewOrderRequest />} />

      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ViewProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-product/:id" element={<AddProduct />} />

      {/* brand section route */}
      <Route path="/brand-list" element={<BrandList />} />
      <Route path="/add-brand" element={<AddBrand />} />
      <Route path="/edit-brand/:id" element={<AddBrand />} />
      <Route path="/view-brand/:id" element={<ViewBrand />} />

      {/* logger section route */}
      <Route path="/error-logs" element={<ErrorLogs />} />
      <Route path="/email-queue" element={<EmailQueue />} />
      <Route path="/email-view/:id" element={<ViewEmailQueue />} />
      <Route path="/login-activity" element={<LoginActivity />} />
      <Route path="/view-login-activity/:id" element={<ViewLoginActivity />} />

      <Route path="/faq" element={<AdminFaq />} />
      <Route path="/add-faq" element={<AdminAddFaq />} />
      <Route path="/edit-faq/:id" element={<AdminAddFaq />} />
      <Route path="/view-faq/:id" element={<AdminViewFaq />} />

      {/* cms section route */}
      <Route path="/cms-list" element={<CmsList />} />
      <Route path="/add-cms" element={<AddCms />} />
      <Route path="/edit-cms/:id" element={<AddCms />} />
      <Route path="/view-cms/:id" element={<ViewCms />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AdminRoute;
