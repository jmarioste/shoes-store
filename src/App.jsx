import React from "react";
import { GlobalStyles } from "GlobalStyles";
import { Route, Routes } from "react-router-dom";
import Detail from "pages/Detail";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Products from "pages/Products";
import { Footer, Header } from "components";
import Home from "pages/Home";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:category" element={<Products />}></Route>
        <Route path="/:category/:id" element={<Detail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
