import React, { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer, {
  loadCartFromStorage,
  saveCartToStorage,
} from "reducers/CartReducer";

const initialCart = loadCartFromStorage();
const CartContext = createContext(null);

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const value = { cart, dispatch };
  useEffect(saveCartToStorage, [cart]);
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "Context not found. Use <CartProvider> in a parent component."
    );
  }
  return context;
}
