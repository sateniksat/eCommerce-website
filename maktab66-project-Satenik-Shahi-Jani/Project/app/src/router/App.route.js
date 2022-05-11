import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryManegment from "../adminPages/inventoryManegment/InventoryManegment";
import ProtectedRout from "../adminPages/ProtectedRoute/ProtectedRoute";
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
import CategoryShop from "../costumerPages/Category/CategoryShop";
import { Login } from "../adminPages/Login/Login";
import OrderManegment from "../adminPages/orderManegment/OrderManegment";
import ProductManegment from "../adminPages/productManegment/ProductManegment";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route index={true} element={<AllCategories />} />
        <Route path="category/:categoryId" element={<CategoryShop />} />
        <Route path="products/:productId" element={<Product />} />
        <Route path="checkout" element={<Cart />}>
          <Route path="purchaseform" element={<ShopForm />} />
        </Route>
        <Route path={"shaparak"} element={<Shaparak />} />
        <Route path={"login"} element={<Login />} />
        <Route path="successfuloperation" element={<SuccessOperation />} />
        <Route path="failedoperation" element={<FailedOperation />} />
        <Route
          path="admin/inventory"
          element={
            <ProtectedRout>
              <InventoryManegment />
            </ProtectedRout>
          }
        />
        <Route
          path="admin/order"
          element={
            <ProtectedRout>
              <OrderManegment />
            </ProtectedRout>
          }
        />
        <Route
          path="admin/productmanage"
          element={
            <ProtectedRout>
              <ProductManegment />
            </ProtectedRout>
          }
        />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
