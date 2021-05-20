const { createGlobalStyle } = require("styled-components");

export const GlobalStyles = createGlobalStyle`
  :root{
    --color-primary: #5d6d7c;
    --color-primary-light: #8b9bab;
    --color-primary-dark:#334250;
    --color-secondary: #fdd000;
    --color-secondary-light: #ffff51;
    --color-secondary-dark: #c59f00;
    --color-on-primary: #f2f2f2;
    --color-on-secondary: #222222;

    --size-h1: 6rem;
    --size-h2: 
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: var(--color-primary-dark);
    background-color: #fff;
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
    border: 0;
    vertical-align: middle;
  }
  h1 {
    font-weight: lighter;
    font-size: 4.5rem;
    letter-spacing: -1.5px;
  }
  h2 {
    font-weight: 300;
    font-size: 3.75rem;
    letter-spacing: -0.5px;
  }

  h3 {
    font-weight: normal;
    font-size: 3rem;
    letter-spacing: 0px;
  }

  h4 {
    font-weight: normal;
    font-size: 2.125rem;
    letter-spacing: 0px;
  }
  h5 {
    font-weight: normal;
    font-size:1.5rem;
    letter-spacing: 0px;
  }

  h5 {
    font-weight: normal;
    font-size: 1.25rem;
    letter-spacing: 0px;
  }

  .subtitle {
    letter-spacing: .15px;
    font-size: 1rem;
    font-weight: normal;
  }
  button {
    font-weight: medium;
    font-size:0.875rem;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
`;
