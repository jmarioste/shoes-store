import { useCart } from "contexts/CartContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiMenu } from "react-icons/fi";

import {
  _NavBar,
  NavMenu,
  NavBrand,
  NavList,
  NavItem,
  Badge,
  Spacer,
  NavMenuIcon,
} from "./NavBar.styles";

const NavBar = () => {
  const { cart } = useCart();
  const [showList, setShowList] = useState();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <_NavBar>
      <NavMenu>
        <NavBrand>
          <Link to="/">
            <img alt="Carved Rock Fitness" src="/images/logo-white.png" />
          </Link>
        </NavBrand>

        <NavList show={showList} onClick={() => setShowList(false)}>
          <NavItem>
            <Link to="/shoes">Shoes</Link>
          </NavItem>
          <NavItem>
            <Link to="/backpacks">Backpacks</Link>
          </NavItem>
          <NavItem>
            <Link to="/cart">
              Cart
              <Badge>{count}</Badge>
            </Link>
          </NavItem>
          <Spacer></Spacer>
          <NavItem>
            <a href="#!">Login</a>
          </NavItem>
        </NavList>

        <NavMenuIcon>
          <a onClick={() => setShowList(!showList)}>
            <FiMenu />
          </a>
        </NavMenuIcon>
      </NavMenu>
    </_NavBar>
  );
};

export default NavBar;
