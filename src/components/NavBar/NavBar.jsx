import { useCart } from "contexts/CartContext";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: center;

  background-color: #f2efe2;
  width: 100%;
  font-size: 1rem;

  ul {
    list-style: none;
    align-items: center;
    display: flex;
    max-width: 960px;
    flex-grow: 1;
    li.link {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        transition: all 0.3s ease;
        background-color: #fdd000;
      }
      a {
        text-decoration: none;
        color: #5d6d7c;
        padding: 20px;
      }
      .badge {
        margin-left: 10px;
        display: inline-block;
        width: 24px;
        background-color: #5d6d7c;
        border-radius: 11px;
        font-size: 0.8rem;
        color: white;
        text-align: center;
      }
    }
    li.brand {
      padding-left: 20px;
      img {
        max-height: 40px;
      }
    }
    li.spacer {
      flex-grow: 1;
    }
  }
`;

const NavBar = () => {
  const { cart } = useCart();

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <StyledNavBar>
      <ul>
        <li className="brand">
          <Link to="/">
            <img alt="Carved Rock Fitness" src="/images/logo.png" />
          </Link>
        </li>
        <li className="link">
          <Link to="/shoes">Shoes</Link>
        </li>

        <li className="link">
          <Link to="/cart">
            Cart
            <span className="badge">{count}</span>
          </Link>
        </li>
        <li className="spacer"></li>
        <li className="link">
          <a href="#!">Login</a>
        </li>
      </ul>
    </StyledNavBar>
  );
};

export default NavBar;
