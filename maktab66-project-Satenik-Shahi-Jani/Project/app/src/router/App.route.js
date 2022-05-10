import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminMain from "../adminPages.js/AdminMain/AdminMain";
import ProtectedRout from "../adminPages.js/ProtectedRoute/ProtectedRoute";
import Cart from "../costumerPages/Cart/Cart";
// import CategoryShop from "../CostumerPages/Category/CategoryShop";
import FailedOperation from "../costumerPages/FailedOperation/FailedOperation";
import AllCategories from "../costumerPages/Home/AllCategories";
// import Welcome from "../CostumerPages/Home/Welcome";
import Product from "../costumerPages/Product/Product";
import ShopForm from "../costumerPages/ShopForm/ShopForm";
import Shaparak from "../costumerPages/Shaparak/Shaparak";
import SuccessOperation from "../costumerPages/SuccessOperation/SuccessOperation";
import NotFound from "../notFound/NotFound";
import CategoryShop from '../costumerPages/Category/CategoryShop';

export default function AppRoute() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index={true} element={<AllCategories/>} />
        <Route path="category/:categoryId" element={<CategoryShop/>} />
        <Route path="products/:productId" element={<Product />} />
        <Route path="checkout" element={<Cart />}>
          <Route path="purchaseform" element={<ShopForm />} />
        </Route>
        <Route path={"shaparak"}element={<Shaparak />} />
        <Route path="successfuloperation" element={<SuccessOperation />} />
        <Route path="failedoperation" element={<FailedOperation />} />
        <Route
          path="admin"
          element={
            <ProtectedRout>
              <AdminMain />
            </ProtectedRout>
          }
        ></Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
