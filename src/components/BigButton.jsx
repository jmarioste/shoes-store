import { Button } from "components";
import styled from "styled-components";

const BigButton = styled(Button)`
  padding: 20px;
  background-color: var(--color-secondary);
  color: var(--color-text);
  &:hover {
    background-color: var(--color-secondary-dark);
  }
`;

export default BigButton;
