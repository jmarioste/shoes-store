import { ErrorBoundary } from "components";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "contexts/CheckoutContext";
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
