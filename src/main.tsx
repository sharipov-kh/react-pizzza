import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import { AppcontextProvider } from "./store/Context";
import { Provider } from "react-redux";
import store from "./redux/store";
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <AppcontextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppcontextProvider>
    </Provider>
  );
} else {
  console.error("Element with id 'root' not found.");
}
