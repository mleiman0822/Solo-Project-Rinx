import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button } from "react-bootstrap";

class RegisterForm extends Component {
  state = {
    username: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: "REGISTER",
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "30%",
          justifyContent: "center",
          margin: "0 auto",
          display: "block",
          opacity: "0.9",
        }}
        className="formPanel"
        onSubmit={this.registerUser}
      >
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor("username")}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor("password")}
            />
          </label>
        </div>
        <div>
          <Button
            variant="primary"
            className="btn"
            type="submit"
            name="submit"
            value="Register"
          >
            Register
          </Button>
          <br />
          <br />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
