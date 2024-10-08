import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />{" "}
      <App />
    </Provider>
  </StrictMode>
);
