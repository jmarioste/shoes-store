const { createGlobalStyle } = require("styled-components");

export const GlobalStyles = createGlobalStyle`
html {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "open sans", sans-serif;
  font-size: 14px;
  color: #364147;
  background-color: #fff;
}

img {
  max-width: 100%;
  height: auto;
  border: 0;
  vertical-align: middle;
}

`;
