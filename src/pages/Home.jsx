import { BigButton } from "components";
import React from "react";
import { Wrapper, Hero, Title, SubTitle, Content } from "./Home.styles";

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
