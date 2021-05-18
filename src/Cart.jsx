import { useCart } from "contexts/CartContext";
import React from "react";
import { useNavigate } from "react-router";
import useFetchAll from "./services/useFetchAll";
import { Spinner } from "./components";
import styled from "styled-components";

const CartItem = styled.div`
  display: flex;
  justify-content: left;
  align-content: center;
  border-bottom: 1px solid #5d6d7c;
  list-style: none;
  width: 100%;
  img {
    max-width: 200px;
  }
  .name {
    flex-grow: 1;
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    img {
      max-width: 100%;
    }
  }
`;

export default function Cart() {
  const { cart, dispatch } = useCart();
  const urls = cart.map((i) => `products/${i.id}`);
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku}>
        <CartItem>
          <img src={`/images/${image}`} alt={name} />
          <div className="name">
            <h3>{name}</h3>
            <p>Size: {size}</p>
          </div>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) =>
                dispatch({
                  type: "updateQuantity",
                  sku,
                  quantity: parseInt(e.target.value),
                })
              }
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <p>${price}</p>
        </CartItem>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <section className="p-grid">
      <h1 className="p-col-12"> Shopping Cart </h1>
      {numItems === 0 ? (
        <h2> Your cart is empty</h2>
      ) : (
        <h2>{`${numItems} Item${numItems > 1 ? "s" : ""} in your cart.`}</h2>
      )}
      <ul className="p-col-12">{cart.map(renderItem)}</ul>
      {cart.length > 0 && (
        <button
          className="btn btn-primary p-col-12"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
