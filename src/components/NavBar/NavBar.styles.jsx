import styled from "styled-components";
export const _NavBar = styled.nav`
  display: flex;
  justify-content: center;

  background-color: var(--color-primary-dark);
  color: var(--color-on-primary);

  width: 100%;
  font-size: 1rem;
`;

export const NavList = styled.ul`
  list-style: none;
  align-items: center;
  display: flex;
  max-width: 960px;
  flex-grow: 1;
  /* justify-content: space-between; */

  @media screen and (max-width: 720px) {
    flex-direction: column;
    flex-grow: 1;
    position: absolute;
    left: ${(props) => (props.show ? 0 : "-100vw")};
    top: 60px;
    width: 100vw;
    height: calc(90vh);
    align-items: stretch;
    background-color: var(--color-primary-dark);
    transition: 0.3s all ease;
    z-index: 1500;
  }
`;

export const Spacer = styled.li`
  flex-grow: 1;
`;
export const NavMenu = styled.div`
  list-style: none;
  align-items: center;
  display: flex;
  max-width: 960px;
  flex-grow: 1;
  justify-content: space-between;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
  &:hover {
    transition: all 0.3s ease;
    background-color: var(--color-secondary);
    a {
      color: var(--color-on-secondary);
    }
  }

  a {
    text-decoration: none;
    color: var(--color-on-primary);
    padding: 20px;
    width: 100%;
  }
`;

export const NavBrand = styled(NavItem)`
  a {
    padding: 10px;
  }
  img {
    max-height: 40px;
  }
`;

export const NavMenuIcon = styled(NavItem)`
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

export const Badge = styled.span`
  margin-left: 10px;
  display: inline-block;
  width: 24px;
  background-color: var(--color-secondary);
  border-radius: 11px;
  font-size: 0.8rem;
  color: var(--color-on-secondary);
  text-align: center;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }
`;
