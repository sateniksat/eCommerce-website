import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryManegment from "../adminPages/inventoryManegment/InventoryManegment";
import ProtectedRout from "../adminPages/ProtectedRoute/ProtectedRoute";
import Cart from "../CostumerPages/Cart/Cart";
// import CategoryShop from "../CostumerPages/Category/CategoryShop";
// import FailedOperation from "../CostumerPages/FailedOperation/FailedOperation";
import AllCategories from "../CostumerPages/Home/AllCategories";
// import Welcome from "../CostumerPages/Home/Welcome";
import Product from "../CostumerPages/Product/Product";
import ShopForm from "../CostumerPages/ShopForm/ShopForm";
// import Shaparak from "../CostumerPages/Shaparak/Shaparak";
// import Solid from "../CostumerPages/shared/Solid";
import SuccessOperation from "../CostumerPages/SuccessOperation/SuccessOperation";
import NotFound from "../NotFound/NotFound";
import CategoryShop from "../CostumerPages/Category/CategoryShop";
import { Login } from "../adminPages/Login/Login";
import OrderManegment from "../adminPages/orderManegment/OrderManegment";
import ProductManegment from "../adminPages/productManegment/ProductManegment";
import CostumerPageLayout from "../Layouts/CostumerPageLayout";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import SimpleLayout from "../Layouts/SimpleLayout";

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
        {/* <Route path="category" element={<Solid />}>
          <Route
            path=":categoryId"
            element={
              <CostumerPageLayout slider={true}>
                <CategoryShop />
              </CostumerPageLayout>
            }
          >
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="*"
            element={
              <CostumerPageLayout>
                <NotFound />
              </CostumerPageLayout>
            }
          />
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
        />
        <Route
          path="purchaseform"
          element={
            <CostumerPageLayout>
              <ShopForm />
            </CostumerPageLayout>
          }
        />
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
        <Route
          path="/*"
          element={
            <CostumerPageLayout>
              <NotFound />
            </CostumerPageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
