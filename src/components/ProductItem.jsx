import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledProductItem = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: center;
  /* border: 1px solid #e3a765; */

  a {
    text-decoration: none;
    color: #000000;
    img {
    }
  }
`;
const ProductItem = (props) => {
  const { to, image, name, price } = props;
  return (
    <StyledProductItem className="p-col-12 p-md-4">
      <Link to={to}>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </Link>
    </StyledProductItem>
  );
};

export default ProductItem;
