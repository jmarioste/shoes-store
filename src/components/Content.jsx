import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  flex-wrap: wrap;
  flex: 1 0;
  align-self: center;
  justify-content: flex-start;
  max-width: 960px;
`;

export default Content;
