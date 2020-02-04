import React, { Component } from "react";
import ReactBootstrap from "react-bootstrap";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Back from "./Back";

export default class Step2 extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <React.Fragment>
            <Row>
              <p className="prompt">Health Card Information</p>
              <p className="prompt">
                Please input your Health Card information below
              </p>
              <p className="prompt">Health Card number</p>
              <Input />
              <Link to="/elig">Next</Link>
            </Row>
          </React.Fragment>
          <Link to="/">Back</Link>
        </Container>
      </React.Fragment>
    );
  }
}