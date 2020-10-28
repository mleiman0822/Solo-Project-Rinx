import React, { Component } from "react";
import { connect } from "react-redux";
import RinkMap from "../RinkMap/RinkMap";
import MapMarker from "../MapMarker/MapMarker";

class AdminForm extends Component {
  state = {
    name: "",
    note: "",
    image: "",
    address: "",
    status: 1,
    indoor_or_outdoor: "",
    latitude: 46.877186,
    longitude: -96.789803,
    zoom: 10,
    showPopup: true,
  };

  onSubmit = (event) => {
    event.preventDefault();

    // simple dispatch for the saga to take care of
    this.props.dispatch({
      type: "CREATE_RINK",
      payload: this.state,
    });

    // clear local state!
    this.setState({
      name: "",
      note: "",
      image: "",
      address: "",
      status: 1,
      indoor_or_outdoor: "",
      longitude: 46.877186,
      longitude: -96.789803,
    });
  };
  render = () => {
    return (
      <>
        <RinkMap />
        <form onSubmit={this.onSubmit}>
          <h2>Create New Rink</h2>
          <p>
            Use <a href="https://www.latlong.net/">LatLong.net</a> to get
            Latitude / Longitude points. After adding the map, the map will
            auto-update but it will not auto-update to show all pins (thats up
            to the user)
          </p>
          Name:{" "}
          <input
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            required
          />
          Notes:{" "}
          <input
            onChange={(e) => this.setState({ note: e.target.value })}
            value={this.state.note}
            required
          />
          Address:{" "}
          <input
            onChange={(e) => this.setState({ address: e.target.value })}
            value={this.state.address}
            required
          />
          Image URL:{" "}
          <input
            onChange={(e) => this.setState({ image: e.target.value })}
            value={this.state.image}
            required
          />
          Status:
          <select
            onChange={(e) => this.setState({ status: e.target.value })}
            value={this.state.status}
            required
          >
            <option value={this.state.status}>Useable</option>
            <option value={this.state.status}>Usable/Needs Maintenance</option>
            <option value={this.state.status}>Not Usable</option>
          </select>
          Indoor or Outdoor?:{" "}
          <input
            onChange={(e) =>
              this.setState({ indoor_or_outdoor: e.target.value })
            }
            value={this.state.indoor_or_outdoor}
            required
          />
          Latitude:{" "}
          <input
            onChange={(e) => this.setState({ latitude: e.target.value })}
            value={this.state.latitude}
            required
          />
          Longitude:{" "}
          <input
            onChange={(e) => this.setState({ longitude: e.target.value })}
            value={this.state.longitude}
            required
          />
          <div>
            <button type="submit">Add Rink To Map</button>
          </div>
        </form>
      </>
    );
  };
}

export default connect()(AdminForm);
