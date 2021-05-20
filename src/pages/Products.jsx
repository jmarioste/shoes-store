import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import useFetch from "services/useFetch";

import { Spinner, Select, ProductItem, PageNotFound } from "components";

const Content = styled.div`
  padding: 20px;
  display: grid;
  flex: 1 0;
  align-self: center;
  max-width: 960px;
  align-items: flex-start;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 60px 1fr;
  grid-column-gap: 0.5rem;

  label {
    grid-row: 1/2;
    grid-column: 1/2;
    align-self: center;
    text-align: right;
  }
  select {
    grid-row: 1/2;
    grid-column: 2/4;
    align-self: center;
  }
  #product-list {
    display: flex;
    /* align-items: flex-start; */
    flex-wrap: wrap;
    grid-row-start: 2;
    grid-column: 1/7;

    div {
      max-width: 300px;
    }
  }

  @media screen and (max-width: 576px) {
    grid-template-rows: 60px 60px 1fr;
    label {
      grid-column: 1/7;
      text-align: center;
    }
    select {
      grid-row: 2/3;
      grid-column: 1/7;
    }
    #product-list {
      grid-row: 3/4;
      grid-column: 1/7;
    }
  }
`;

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const {
    data: products,
    loading,
    error,
  } = useFetch(`products?category=${category}`);

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <Content>
      <label htmlFor="size">Filter by Size</label>{" "}
      <Select id="size" value={size} onChange={() => setSize(size)}>
        <option value="">All sizes</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Select>
      <div id="product-list">
        {filteredProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              {...product}
              to={`/${category}/${product.id}`}
            />
          );
        })}
      </div>
    </Content>
  );
}
