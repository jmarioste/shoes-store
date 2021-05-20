const { createGlobalStyle } = require("styled-components");

export const GlobalStyles = createGlobalStyle`
#root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #364147;
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

`;
