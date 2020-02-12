import React, { Component } from "react";
import ReactBootstrap from "react-bootstrap";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Back from "./Back";
import Email from "../Form.js";
import * as emailjs from "emailjs-com";
import Error from "./error/Error";
import ErrorMsg from "./error/ErrorMsg";

class Contact extends Component {
  state = {
    email: "",
    voice: "",
    voicedisabled: false
  };
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.checkvoice = this.checkvoice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.sendEmail = this.sendEmail.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }

  handleSubmit = e => {
    if (!this.state.emaildisabled) {
      //sending email and phone number to app.js to use in notify and review details page
      this.props.sendContact(this.state.email, this.state.voice);

      // const { email } = this.state;
      // let templateParams = {
      //   to_name: email
      // };
      // emailjs.send(
      //   "gmail",
      //   "template_RLG3E76r",
      //   templateParams,
      //   "user_u3p3HFlbdGyXe6PNlzFis"
      // );
      console.log("sent");
    }
  };
  // sendEmail = (email, e) => {
  //   if (email !== "") {
  //     this.handleSubmit(e);
  //     //sending email and phone number to app.js to use in notify and review details page
  //     this.props.sendContact(this.state.email, this.state.voice);
  //   }
  // };

  // handleChange = (param, e) => {
  //   this.setState({ [param]: e.target.value });
  //   if (this.state.email !== "") {
  //     this.setState({ emailfail: false });
  //   }
  // };

  componentDidMount() {
    this.checkvoice();
    this.checkemail();
  }

  onSubmit() {
    if (this.state.voicedisabled && this.props.showhc) {
      this.setState({ voicefail: true });
    } else {
      this.setState({ voicefail: false });
    }

    if (this.state.emaildisabled) {
      this.setState({ emailfail: true });
    } else {
      this.setState({ emailfail: false });
    }
  }
  checkvoice() {
    var regex = /^[(]?\d{3}[)]?[ -]?\d{3}[ -]?\d{4}$/;
    var match = regex.exec(this.state.voice);
    if (this.props.showhc) {
      if (match) {
        this.setState({ voicedisabled: false, voicefail: false });
      } else {
        this.setState({ voicedisabled: true });
      }
    }
  }

  checkemail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var match = regex.exec(this.state.email);
    if (match) {
      this.setState({ emaildisabled: false, emailfail: false });
    } else {
      this.setState({ emaildisabled: true });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div class="landing-body">
          <Back onClick={this.goBack} />
          {this.state.voicefail && this.state.emailfail ? (
            <Error bul1="Phone number" bul2="Email" />
          ) : this.state.emailfail && !this.state.voicefail ? (
            <Error bul1="Email" />
          ) : this.state.voicefail && !this.state.emailfail ? (
            <Error bul1="Phone number" />
          ) : (
            ""
          )}
          <Container className={this.state.voicefail ? "error-content" : ""}>
            <Row>
              <h2 className="sub-header">Contact information</h2>
            </Row>
            <Row>
              <p>Enter your contact information below</p>
            </Row>
            <Row>
              <strong style={{ paddingRight: 50 + "rem" }}>Email</strong>
              {this.state.emailfail ? (
                <ErrorMsg msg="Please provide a valid email" />
              ) : (
                ""
              )}
              <p>For example odslab@ontario.ca</p>
              {/* <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicEmail"> */}
              <input
                ref={input => (this.email = input)}
                onChange={() => {
                  let temp = this.email;
                  temp = this.email.value;
                  this.setState({ email: temp });
                }}
                onBlur={() => this.checkemail()}
              />
              {/* </FormGroup> */}
              <p>
                We will email you an electronic receipt and temporary
                document(s) for this transaction.
              </p>
              <br></br>
            </Row>
          </Container>
          <div className={this.state.emailfail ? "error-content" : ""}>
            <strong>
              Phone number {!this.props.showhc ? "(optional)" : ""}
            </strong>
            {this.state.voicefail ? (
              <ErrorMsg msg="Please provide a phone number" />
            ) : (
              ""
            )}
            <p>For example 226 808 3813</p>

            <input
              id="voicey"
              ref={input => (this.voicey = input)}
              onChange={() => {
                let temp = this.voicey;
                temp = this.voicey.value;
                this.setState({ voice: temp });
              }}
              onBlur={() => this.checkvoice()}
            />
            <p>
              We may call you to confirm that you live in Ontario, or to resolve
              an issue with your renewal.
            </p>

            {(this.state.voicedisabled && this.props.showhc) ||
            this.state.emaildisabled ? (
              <Button onClick={() => this.onSubmit()}>Next</Button>
            ) : (
              <Link to="/notify-so">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => this.handleSubmit()}
                >
                  Next
                </Button>
              </Link>
            )}
            {/* </Form> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Contact);
