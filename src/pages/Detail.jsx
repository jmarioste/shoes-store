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

  const { data: product, loading, error } = useFetch("products/" + id);
  const [sku, setSku] = useState(product?.skus[0].sku || "");
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  function addToCart() {
    const _sku = sku || product.skus[0].sku;
    dispatch({ type: "add", id, sku: _sku, price: product.price });
    navigate("/cart");
  }

  return (
    <Content>
      <ImageContainer>
        <img src={`/images/${product.image}`} alt={product.category} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>

        <h4>${product.price}</h4>
        {sku.size && <p id="size">Size</p>}
        {sku.size && (
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
        )}
        <p id="description">{product.description}</p>
        <BigButton onClick={addToCart}> Add to Cart</BigButton>
      </ProductDetails>
    </Content>
  );
}
