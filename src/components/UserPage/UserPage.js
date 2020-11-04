import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./UserPage.css";

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "30%",
          justifyContent: "center",
          margin: "0 auto",
          display: "block",
          opacity: "0.8",
        }}
        className="userPage"
      >
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p style={{ color: "black" }}>
          Your User ID is: {this.props.store.user.id}
        </p>
        <LogOutButton className="log-in" />
        <br />
        <br />
        <Link to="/changeusername">
          <Button variant="primary">Change Username</Button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
