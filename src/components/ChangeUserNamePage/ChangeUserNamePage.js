import React, { Component } from "react";
import { connect } from "react-redux";

import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";
import { Button } from "react-bootstrap";
import "../App/App.css";

export class ChangeUserNamePage extends Component {
  state = {
    username: "",
    showInput: false,
  };

  //edit user name function with popup
  editUsername = () => {
    swal({
      title: "Are you sure?",
      text: "Once your username is changed, its required to log back in.",
      icon: "warning",
      buttons: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        swal(
          `Username updated to ${this.state.username}! Please login again.`,
          { icon: "success" }
        );
        this.props.dispatch({
          type: "EDIT_USER",
          payload: {
            username: this.state.username,
            userId: this.props.user.id,
          },
        });
        this.setState({ showInput: false, username: "" });
      } else {
        swal(`Your username will continue to be ${this.props.user.username}!`);
        this.setState({ username: "" });
      }
    });
  };

  //edit username form
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
      >
        <Grid item className="welcomeSection">
          <h1 id="welcome">Greetings, {this.props.user.username}!</h1>
          <br />

          {this.state.showInput ? (
            <>
              <input
                type="text"
                value={this.state.username}
                placeholder="Enter New Username"
                id="usernameInput"
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />
              <br />
              <br />

              {""}
              <span>
                <Button
                  variant="danger"
                  onClick={this.editUsername}
                  className="usernameButtons"
                >
                  Update
                </Button>
                <br />
                {""}

                <Button
                  variant="secondary"
                  onClick={() =>
                    this.setState({ showInput: false, username: "" })
                  }
                  className="usernameButtons"
                >
                  Cancel
                </Button>
              </span>
              <br />
              <br />
            </>
          ) : (
            <>
              <Button
                variant="danger"
                onClick={() => this.setState({ showInput: true })}
                className="usernameButton"
              >
                Update Username
              </Button>
              <br />
              <br />
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ChangeUserNamePage);
