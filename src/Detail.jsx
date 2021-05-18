// @ts-nocheck
import { useCart } from "contexts/CartContext";
import PageNotFound from "PageNotFound";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "services/useFetch";
import Spinner from "components/Spinner";
import { Select } from "components";
import styled from "styled-components";

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
    dispatch({ type: "add", id, sku });
    navigate("/cart");
  }

  return (
    <div className="p-grid">
      <ImageContainer className="p-col-12 p-md-6">
        <img src={`/images/${product.image}`} alt={product.category} />
      </ImageContainer>
      <div className="p-grid p-col-12 p-md-6 ">
        <div className="p-col-12 p-col-align-center">
          <h1>{product.name}</h1>
        </div>

        <div className="p-col-12" id="price">
          <h3>${product.price}</h3>
        </div>
        <p className="p-col-6" id="price">
          Size
        </p>
        <Select
          className="p-col-6"
          id="size"
          value={sku}
          onChange={(event) => setSku(event.target.value)}
        >
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </Select>
        <p className="p-col-12">{product.description}</p>
        <p className="p-col-12">
          <button
            disabled={!sku}
            className="btn btn-primary"
            onClick={addToCart}
          >
            {" "}
            Add to Cart
          </button>
        </p>
      </div>
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    max-height: 400px;
  }
`;
