import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { ModalProvider } from "./context/modal/index.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);
