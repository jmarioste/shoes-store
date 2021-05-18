import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  text-align: center;
  color: gray;
  padding: 20px 0;
  flex-shrink: 0;
  background-color: gainsboro;
  padding: 40px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        This site is created for demonstrative purposes only and does not offer
        any real products or services.
      </p>
      <p>&copy; Pluralsight 2020</p>
    </StyledFooter>
  );
}
