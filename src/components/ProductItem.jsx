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
    <StyledProductItem>
      <Link to={to}>
        <img src={`/images/${image}`} alt={name} />
        <h5>{name}</h5>
        <p>${price}</p>
      </Link>
    </StyledProductItem>
  );
};

export default ProductItem;
