import styled from "styled-components";
import { BigButton, Content as _Content } from "components";
import React from "react";

const Wrapper = styled(_Content)`
  width: 100%;
  max-width: 100%;
`;

const Content = styled(_Content)`
  margin-top: 20px;
  flex: 0 0 0;
`;

const SubTitle = styled.div`
  margin: 20px 0 80px 0;
  text-align: left;
`;
const Title = styled.div`
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
const Hero = styled.div`
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

const Home = () => {
  return (
    <Wrapper>
      <Hero>
        <Title>
          <h1>Carved Rock Fitness</h1>
          <SubTitle>We offer the best gear without compromising style</SubTitle>
          <BigButton>Shop now</BigButton>
        </Title>
      </Hero>

      <Content></Content>
    </Wrapper>
  );
};

export default Home;
