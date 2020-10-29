import React, { Component } from "react";
import { connect } from "react-redux";

import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";

export class ChangeUserNamePage extends Component {
  state = {
    username: "",
    showInput: false,
  };

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
  render() {
    return (
      <div>
        <Grid item className="welcomeSection">
          <h1 id="welcome">Greetings, {this.props.user.username}!</h1>
          {/* Conditional rendering here: if showInput is true, then we will
              show the input and the update button!  If not, then we will
              show the Update Username button ONLY.  On click of the
              Update Username button will set showInput to true.
              If they choose to follow through with the update, then
              it will set showInput back to false. */}
          {this.state.showInput ? (
            <>
              <input
                type="text"
                value={this.state.username}
                placeholder="Update Username"
                id="usernameInput"
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />
              <button onClick={this.editUsername} className="usernameButton">
                Update
              </button>
              <button
                onClick={() =>
                  this.setState({ showInput: false, username: "" })
                }
                className="usernameCancelButton"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => this.setState({ showInput: true })}
                className="usernameButton"
              >
                Update Username
              </button>
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
