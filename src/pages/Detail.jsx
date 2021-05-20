// @ts-nocheck
import { useCart } from "contexts/CartContext";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "services/useFetch";
import { Select, BigButton, Spinner, PageNotFound } from "components";
import { Content, ImageContainer, ProductDetails } from "./Detail.styles";

export default function Detail() {
  const { dispatch } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
  const { data: product, loading, error } = useFetch("products/" + id);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  function addToCart() {
    dispatch({ type: "add", id, sku, price: product.price });
    navigate("/cart");
  }

  return (
    <Content>
      <ImageContainer>
        <img src={`/images/${product.image}`} alt={product.category} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>

        <h3>${product.price}</h3>
        <p id="size">Size</p>
        <Select
          id="size-select"
          value={sku}
          onChange={(event) => setSku(event.target.value)}
        >
          <option>Choose size</option>
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </Select>
        <p id="description">{product.description}</p>
        <BigButton disabled={!sku} onClick={addToCart}>
          {" "}
          Add to Cart
        </BigButton>
      </ProductDetails>
    </Content>
  );
}
