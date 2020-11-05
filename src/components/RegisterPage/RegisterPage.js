import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button } from "react-bootstrap";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <div>
        <RegisterForm />
        <br />
        <br />
        <center>
          <h2 style={{ color: "white" }}>Already a Member? Log in!</h2>
          <Button
            variant="primary"
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
