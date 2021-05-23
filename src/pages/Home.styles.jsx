import styled from "styled-components";
import { Content as _Content } from "components";

export const Wrapper = styled(_Content)`
  width: 100%;
  max-width: 100%;
`;

export const Content = styled(_Content)`
  margin-top: 20px;
  flex: 0 0 0;
`;

export const SubTitle = styled.div`
  margin: 20px 0 80px 0;
  text-align: left;
`;

export const Title = styled.div`
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Hero = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("images/hero-img.jpg");
  width: 100%;
  height: 100vh;
  vertical-align: top;

  /* Position and center the image to scale nicely on all screens */
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
