import { useCart } from "contexts/CartContext";
import React from "react";
import { useNavigate } from "react-router";
import useFetchAll from "../services/useFetchAll";
import { BigButton, Spinner } from "components";

import {
  CartItem,
  CartList,
  ProductName,
  Price,
  Content,
  Total,
  CheckoutButton,
  Stepper,
  CartPageTitle,
  EmptyCart,
} from "./Cart.styles";

function Item({ item, products }) {
  const { dispatch } = useCart();
  const { id, sku, quantity, price } = item;
  const { name, image, skus } = products.find((p) => p.id === parseInt(id));
  const { size } = skus.find((s) => s.sku === sku);
  const imageUrl = `/images/${image}`;
  const formattedPrice = (price * quantity).toFixed(2);
  const updateQuantity = (value) => {
    dispatch({
      type: "updateQuantity",
      sku,
      quantity: parseInt(value),
    });
  };
  return (
    <CartItem key={sku}>
      <img src={imageUrl} alt={name} />
      <ProductName>
        <h5>{name}</h5>
        <p>Size: {size}</p>
      </ProductName>
      <Stepper
        value={quantity}
        onChange={updateQuantity}
        style={{ padding: 20 }}
      ></Stepper>
      <Price>${formattedPrice}</Price>
    </CartItem>
  );
}
export default function Cart() {
  const { cart } = useCart();
  const urls = cart.map((i) => `products/${i.id}`);
  const navigate = useNavigate();
  const { data, loading, error } = useFetchAll(urls);

  if (loading) return <Spinner />;
  if (error) throw error;

  function checkout() {
    navigate("/checkout");
  }
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const hasItems = cart.length;
  return (
    <Content>
      <CartPageTitle> Shopping Cart </CartPageTitle>
      <CartList>
        {cart.map((item) => (
          <Item key={item.sku} item={item} products={data} />
        ))}
      </CartList>
      {hasItems ? (
        <React.Fragment>
          <Total>
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
          </Total>
          <CheckoutButton onClick={checkout}>Checkout</CheckoutButton>
        </React.Fragment>
      ) : (
        <EmptyCart>
          <h4>Your cart is empty.</h4>
          <BigButton onClick={() => navigate("/shoes")}>
            Back to Shopping
          </BigButton>
        </EmptyCart>
      )}
    </Content>
  );
}
