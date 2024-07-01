import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./contexts/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductContextProvider>
  </React.StrictMode>
);
