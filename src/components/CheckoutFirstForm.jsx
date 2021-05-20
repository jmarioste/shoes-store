import React from "react";
import { Grid, Row, Col } from "react-styled-flexboxgrid";

const CheckoutFirstForm = () => {
  return (
    <Grid>
      <h1>Checkout</h1>
      <Row>
        <Col xs={12} sm={6}>
          <h2>Contact Information</h2>
          <label>Email address:</label>
          <input id="email" type="text"></input>
        </Col>
        <Col xs={12} sm={6}>
          <h2>Summary</h2>
        </Col>
      </Row>
    </Grid>
  );
};

export default CheckoutFirstForm;
