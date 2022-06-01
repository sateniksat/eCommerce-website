import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryManegment from "../adminPages/inventoryManegment/InventoryManegment";
import ProtectedRout from "../adminPages/ProtectedRoute/ProtectedRoute";
import Cart from "../costumerPages/Cart/Cart";
// import CategoryShop from "../CostumerPages/Category/CategoryShop";
// import FailedOperation from "../costumerPages/FailedOperation/FailedOperation";
import AllCategories from "../costumerPages/Home/AllCategories";
// import Welcome from "../CostumerPages/Home/Welcome";
import Product from "../costumerPages/Product/Product";
import ShopForm from "../costumerPages/ShopForm/ShopForm";
// import Shaparak from "../costumerPages/Shaparak/Shaparak";
import SuccessOperation from "../costumerPages/SuccessOperation/SuccessOperation";
import NotFound from "../notFound/NotFound";
import CategoryShop from "../costumerPages/Category/CategoryShop";
import { Login } from "../adminPages/Login/Login";
import OrderManegment from "../adminPages/orderManegment/OrderManegment";
import ProductManegment from "../adminPages/productManegment/ProductManegment";
import CostumerPageLayout from "../layouts/CostumerPageLayout";
import AdminPageLayout from "../layouts/AdminPageLayout"
import SimpleLayout from "../layouts/SimpleLayout";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route
          index={true}
          element={
            <CostumerPageLayout>
              <AllCategories />
            </CostumerPageLayout>
          }
        />
        {/* <Route
          path="category/"
          element={
            <CostumerPageLayout slider={true}>
              <CategoryShop />
            </CostumerPageLayout>
          }
        >
          <Route path="/*" element={<NotFound />} />
        </Route> */}
        <Route
          path="category/:categoryId"
          element={
            <CostumerPageLayout slider={true}>
              <CategoryShop />
            </CostumerPageLayout>
          }
        />
        <Route
          path="products/:productId"
          element={
            <CostumerPageLayout>
              <Product />
            </CostumerPageLayout>
          }
        />
        <Route
          path="checkout"
          element={
            <CostumerPageLayout>
              <Cart />
            </CostumerPageLayout>
          }
        >
          <Route
            path="purchaseform"
            element={
              <CostumerPageLayout>
                <ShopForm />
              </CostumerPageLayout>
            }
          />
        </Route>
        <Route
          path={"login"}
          element={
            <SimpleLayout>
              <Login />
            </SimpleLayout>
          }
        />
        <Route
          path="operation/:operationID"
          element={
            <CostumerPageLayout>
              <SuccessOperation />
            </CostumerPageLayout>
          }
        />
        <Route
          path="/admin-inventory"
          element={
            <ProtectedRout>
              <AdminPageLayout>
                <InventoryManegment />
              </AdminPageLayout>
            </ProtectedRout>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedRout>
              <AdminPageLayout>
                <OrderManegment />
              </AdminPageLayout>
            </ProtectedRout>
          }
        />
        <Route
          path="/admin-productmanagement"
          element={
            <ProtectedRout>
              <AdminPageLayout>
                <ProductManegment />
              </AdminPageLayout>
            </ProtectedRout>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
