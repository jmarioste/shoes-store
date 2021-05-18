import React, { useState } from "react";
import { useParams } from "react-router";

import useFetch from "services/useFetch";

import PageNotFound from "PageNotFound";
import { Spinner, FilterBox } from "components";

import ProductItem from "components/ProductItem";

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
    <div className="p-grid p-justify-center">
      <div className="p-col-12">
        <FilterBox
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </div>
      <div className="p-grid p-col-12">
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
    </div>
  );
}
