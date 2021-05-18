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
          <Link to="/cart">Cart</Link>
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
