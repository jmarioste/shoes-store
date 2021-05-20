import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  flex: 1 0;
  align-self: center;
  max-width: 960px;
  padding: 20px;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ImageContainer = styled.div`
  img {
    max-height: 400px;
  }
`;

export const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 25%);
  justify-content: start;
  grid-template-rows: repeat(6, 1fr) 60%;
  /* grid-row-gap: 0.5rem;   */
  grid-template-areas:
    "title title title title"
    "price price price price"
    "size select select select"
    "desc desc desc desc"
    ". . . ."
    "button button button button";

  @media screen and (max-width: 720px) {
    justify-content: center;
  }

  h1 {
    grid-area: title;
    font-size: 2.5rem;
    align-self: center;
    font-weight: 300;
  }
  h2 {
    grid-area: price;
  }
  #size {
    grid-area: size;
  }
  #size-select {
    grid-area: select;
  }
  #description {
    grid-area: desc;
  }
  button {
    grid-area: button;
  }
`;
