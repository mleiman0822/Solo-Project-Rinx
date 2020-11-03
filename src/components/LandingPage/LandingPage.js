import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button } from "react-bootstrap";

import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

class LandingPage extends Component {
  state = {
    heading: "Welcome To Rinx!",
  };

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p></p>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <h4>Already a Member?</h4>
            <Button className="btn btn_sizeSm" onClick={this.onLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
