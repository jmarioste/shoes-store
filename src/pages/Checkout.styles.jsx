import styled from "styled-components";

import { Content as _Content, BigButton } from "components";

export const Content = styled(_Content)`
  align-items: stretch;
  align-content: flex-start;
  align-self: center;
  padding: 1.5rem;
  max-width: 960px;
  display: grid;
  background-color: #f3f3f3;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "title title title title"
    "form form summary summary"
    "form form summary summary";
  h1 {
    grid-column: title;
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    align-self: stretch;
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    align-self: stretch;
    grid-template-areas:
      "title "
      "summary"
      "form";
  }
  label[role="error"] {
    color: var(--color-error);
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
  .field {
    grid-column: 1/3;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  input {
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
  @media screen and (min-width: 720px) {
    .firstName,
    .zipCode {
      grid-column: 1/2;
    }
    .lastName,
    .city {
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

export const ContinueButton = styled(BigButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
`;
