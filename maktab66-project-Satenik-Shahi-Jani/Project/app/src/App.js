// import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminMain from "./AdminPages.js/AdminMain/AdminMain";
import ProtectedRout from "./AdminPages.js/ProtectedRoute/ProtectedRoute";
import Cart from "./CostumerPages/Cart/Cart";
import CategoryShop from "./CostumerPages/Category/CategoryShop";
import FailedOperation from "./CostumerPages/FailedOperation/FailedOperation";
import AllCategories from "./CostumerPages/Home/AllCategories";
// import Welcome from "./CostumerPages/Home/Welcome";
import Product from "./CostumerPages/Product/Product";
import ShopForm from "./CostumerPages/ShopForm/ShopForm";
import Shaparak from "./CostumerPages/Shaparak/Shaparak";
import SuccessOperation from "./CostumerPages/SuccessOperation/SuccessOperation";
// import store from "./Store/store";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
    // <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index={true} element={<AllCategories />} />
          <Route path="category/:categoryId" element={<CategoryShop />} />
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
    //</Provider>
  );
}

export default App;
