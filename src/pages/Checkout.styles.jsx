import styled from "styled-components";

import { Content as _Content } from "components";

export const Content = styled(_Content)`
  align-items: stretch;
  align-self: stretch;
  padding: 1.5rem;
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "title title title title"
    "form form summary summary"
    "form form summary summary";
  h1 {
    grid-column: title;
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title "
      "form"
      "summary";
  }
`;

export const CheckoutForm = styled.div`
  grid-area: form;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  align-items: stretch;
  h5,
  label {
    padding-left: 0;
    grid-column: 1/3;
  }
  input {
    grid-column: 1/3;
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    border-radius: 4px;
  }
  button {
    grid-column: 1/3;
  }
  @media screen and (min-width: 960px) {
    #firstName,
    #zipCode {
      grid-column: 1/2;
    }

    #lastName,
    #city {
      grid-column: 2/3;
    }
    button {
      grid-column: 2/3;
    }
  }
`;

export const CheckoutSummary = styled.div`
  grid-area: summary;
`;
