import { useCart } from "contexts/CartContext";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const _NavBar = styled.nav`
  display: flex;
  justify-content: center;

  /* background-color: #f2efe2; */
  background-color: var(--color-primary-dark);
  color: var(--color-on-primary);
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
        background-color: var(--color-secondary);
        a {
          color: var(--color-on-secondary);
        }
        .badge {
          background-color: var(--color-primary);
          color: var(--color-on-primary);
        }
      }
      a {
        text-decoration: none;
        color: var(--color-on-primary);
        padding: 20px;
      }
      .badge {
        margin-left: 10px;
        display: inline-block;
        width: 24px;
        background-color: var(--color-secondary);
        border-radius: 11px;
        font-size: 0.8rem;
        color: var(--color-on-secondary);
        text-align: center;
      }
    }
    li.brand {
      a {
        padding: 10px;
      }
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
    <_NavBar>
      <ul>
        <li className="link brand">
          <Link to="/">
            <img alt="Carved Rock Fitness" src="/images/logo-white.png" />
            {/* Carved Rock Fitness */}
          </Link>
        </li>
        <li className="link">
          <Link to="/shoes">Shoes</Link>
        </li>
        <li className="link">
          <Link to="/backpacks">Backpacks</Link>
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
    </_NavBar>
  );
};

export default NavBar;
