import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoute from "./router/App.route";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <>
      <Provider store={store}>
          <CacheProvider value={cacheRtl}>
            <AppRoute dir="rtl" />
          </CacheProvider>
      </Provider>
    </>
  );
}

export default App;
