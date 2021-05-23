import { Spinner } from "components";
import { useCart } from "contexts/CartContext";
import React from "react";
import useFetchAll from "services/useFetchAll";
import styled from "styled-components";

const Wrapper = styled.ul`
  box-shadow: 3px 3px 6px #ddd;
  background-color: #ffffff;
  margin-top: 10px;
  padding: 10px 0;
  li {
    display: flex;
    align-items: center;

    padding: 0 1.25rem;
    img {
      max-width: 80px;
      max-height: 100px;
      padding: 10px;
    }
    .productTitle {
      flex-grow: 1;
    }
    .quantity {
      flex-basis: 50px;
    }
    .price {
      flex-basis: 80px;
      text-align: right;
    }
  }
  .totalPrice {
    text-align: right;
    padding: 10px 1.25rem;
    border-top: 1px solid var(--color-primary);
    font-weight: 700;
  }
`;
const SummaryItem = ({ item, products }) => {
  const { id, sku, quantity, price } = item;
  const { name, image, skus } = products.find((p) => p.id === parseInt(id));
  const { size } = skus.find((s) => s.sku === sku);
  const imageUrl = `/images/${image}`;
  const formattedPrice = (price * quantity).toFixed(2);

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div className="productTitle">
        <h5>{name} </h5> x <span className="subtitle">{quantity}</span>
        {size && <p className="overline">Size: {size}</p>}
      </div>
      <p className="price">${formattedPrice}</p>
    </li>
  );
};

const CheckoutSummaryDetails = () => {
  const { cart } = useCart();
  const urls = cart.map((i) => `products/${i.id}`);
  const { data, loading, error } = useFetchAll(urls);

  if (loading) return <Spinner />;
  if (error) throw error;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <Wrapper>
      {cart.map((item) => (
        <SummaryItem key={item.sku} item={item} products={data} />
      ))}
      <p className="totalPrice">Total: ${totalPrice.toFixed(2)}</p>
    </Wrapper>
  );
};

export default CheckoutSummaryDetails;
