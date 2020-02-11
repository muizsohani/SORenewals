import React, { Component } from "react";
import ReactBootstrap from "react-bootstrap";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Back from "./Back";
import Radio from "./radio/Radio";
import Error from "./error/Error";
import ErrorMsg from "./error/ErrorMsg";

class MedCon extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }
  state = {};
  goBack() {
    this.props.history.goBack();
  }

  onSubmit() {
    if (!this.state.yes && !this.state.no) {
      this.setState({ fail: true });
    } else {
      this.setState({ fail: false });
    }
  }

  handleNo = () => {
    this.setState({ no: true, yes: false, fail: false });
  };

  handleYes = () => {
    this.setState({ yes: true, no: false, fail: false });
  };

  render() {
    return (
      <React.Fragment>
        <Back onClick={this.goBack} />
        {this.state.fail ? (
          <Error
            bul1="In the last 5 years, have you had any medical conditions that may
          affect your ability to drive or has the doctor told you not to
          drive?"
          />
        ) : (
          ""
        )}
        <Container className={this.state.fail ? "error-content" : ""}>
          <Row>
            <h2 className="sub-header">
              In the last 5 years, have you had any medical conditions that may
              affect your ability to drive or has the doctor told you not to
              drive?
            </h2>
          </Row>
          {this.state.fail ? <ErrorMsg msg="You must choose one." /> : ""}
          <Row>
            <Col>
              <Radio value="Yes" onClick={() => this.handleYes()} />
              <Radio value="No" onClick={() => this.handleNo()} />
            </Col>
          </Row>
          {!this.state.yes && !this.state.no ? (
            <Button onClick={() => this.onSubmit()}>Next</Button>
          ) : this.state.no ? (
            <Link to="/vision">
              <Button>Next</Button>
            </Link>
          ) : (
            <Link to="/ineligible3">
              <Button>Next</Button>
            </Link>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(MedCon);
