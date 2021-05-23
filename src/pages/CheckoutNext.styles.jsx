import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Content as _Content,
  CheckoutForm as _Form,
} from "./Checkout.styles.jsx";

export const Content = styled(_Content)`
  /* margin: 1rem; */
`;

export const CheckoutForm = styled(_Form)`
  grid-gap: 0.5rem;
  align-items: stretch;

  .isSameAddress {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const MyCheckbox = styled(Checkbox)`
  .MuiButtonBase-root {
    padding: 0px;
  }
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: var(--color-secondary);
  }
`;
