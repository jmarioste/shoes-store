import { useCart } from "contexts/CartContext";
import React from "react";
import { useNavigate } from "react-router";
import useFetchAll from "./services/useFetchAll";
import { BigButton, Spinner, Stepper } from "components";
import styled from "styled-components";

const CartItem = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #5d6d7c;
  list-style: none;
  width: 100%;
  padding: 10px;
  img {
    max-width: 200px;
  }
  .name {
    flex-grow: 1;
  }

  .stepper {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 720px) {
    flex-direction: column;
    img {
      max-width: 100%;
    }
  }
`;

const CartList = styled.ul`
  list-style: none;
`;

const Total = styled.div`
  text-align: right;
`;

export default function Cart() {
  const { cart, dispatch } = useCart();
  const urls = cart.map((i) => `products/${i.id}`);
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity, price } = itemInCart;
    const { name, image, skus } = products.find((p) => p.id === parseInt(id));
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku}>
        <CartItem>
          <img src={`/images/${image}`} alt={name} />
          <div className="name">
            <h3>{name}</h3>
            <p>Size: {size}</p>
          </div>
          <div className="stepper">
            <Stepper
              value={quantity}
              onChange={(value) =>
                dispatch({
                  type: "updateQuantity",
                  sku,
                  quantity: parseInt(value),
                })
              }
            />
          </div>
          <p>${(price * quantity).toFixed(2)}</p>
        </CartItem>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <section className="p-grid">
      <h1 className="p-col-12"> Shopping Cart </h1>

      <CartList className="p-col-12">{cart.map(renderItem)}</CartList>
      <Total className="p-col-12">
        <h1>Total: ${totalPrice.toFixed(2)}</h1>
      </Total>
      {cart.length > 0 && (
        <BigButton className="p-col-12" onClick={() => navigate("/checkout")}>
          Checkout
        </BigButton>
      )}
    </section>
  );
}
