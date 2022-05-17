import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoute from "./router/App.route";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </>
  );
}

export default App;
