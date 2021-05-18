import "primeflex/primeflex.css";
import "App.css";
import React from "react";
import Footer from "components/Footer";
import Header from "Header";
import Products from "Products";
import { Route, Routes } from "react-router-dom";
import Detail from "Detail";
import Cart from "Cart";
import Checkout from "Checkout";
import { Content, ContentArea } from "components";
import { GlobalStyles } from "GlobalStyles";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Content>
        <ContentArea>
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
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
