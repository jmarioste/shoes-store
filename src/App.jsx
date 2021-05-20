import "primeflex/primeflex.css";
import React from "react";
import { GlobalStyles } from "GlobalStyles";
import { Route, Routes } from "react-router-dom";
import Detail from "pages/Detail";
import Cart from "pages/Cart";
import Checkout from "Checkout";
import Products from "Products";
import { Footer, Header } from "components";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<h1>Welcome to Carved Rock Fitness</h1>}
        ></Route>
        <Route path="/:category" element={<Products />}></Route>
        <Route path="/:category/:id" element={<Detail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
