import styled from "styled-components";
import {
  BigButton,
  Content as _Content,
  Stepper as _Stepper,
} from "components";

export const Content = styled(_Content)`
  align-items: stretch;
  padding: 1.5rem;
  width: 100%;
`;

export const Stepper = styled(_Stepper)`
  margin: 20px;
`;

export const CartItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #5d6d7c;
  list-style: none;
  width: 100%;
  img {
    max-width: 200px;
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: space-between;
    img {
      max-width: 100%;
    }
  }
`;

export const Price = styled.p`
  flex-basis: 80px;
  text-align: right;
  font-weight: 700;
  @media screen and (max-width: 720px) {
    flex-basis: 0px;
  }
`;
export const ProductName = styled.div`
  flex-grow: 1;
  @media screen and (max-width: 576px) {
    text-align: center;
  }
`;
export const CartList = styled.ul`
  list-style: none;
`;

export const Total = styled.div`
  text-align: right;
  padding-right: 0px;
  padding-left: 0px;
`;

export const CartTitle = styled.h1`
  font-size: 2.5rem;
`;
export const CheckoutButton = styled(BigButton)`
  align-self: flex-end;
  padding: 15px 50px;
`;
