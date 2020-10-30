import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./MapMarker.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MapIcon from "@material-ui/icons/Map";
import Tooltip from "@material-ui/core/Tooltip";

import "mapbox-gl/dist/mapbox-gl.css";

export class MapMarker extends Component {
  state = {
    popUp: false,
    setOpen: false,
  };

  showInMapClicked = () => {
    window.open(
      "https://maps.google.com?q=" +
        this.props.rink.latitude +
        "," +
        this.props.rink.longitude
    );
  };

  handlePopUp = () => {
    this.setState({ popUp: true });
  };

  closePopUp = () => {
    this.setState({ popUp: false });
  };

  addToFavorites = () => {};

  render() {
    const rink = this.props.rink;
    return (
      <>
        <Marker
          className="mapboxgl-marker"
          key={rink.id}
          latitude={Number(rink.latitude)}
          longitude={Number(rink.longitude)}
        >
          <div className="map-marker">
            <img
              style={{ cursor: "pointer" }}
              onClick={this.handlePopUp}
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
              alt={rink.note}
            />
          </div>
        </Marker>
        {this.state.popUp !== false ? (
          <Popup
            className="popUp"
            latitude={Number(rink.latitude)}
            longitude={Number(rink.longitude)}
            onClose={this.closePopUp}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
          >
            <h4>{rink.name}</h4>
            <h5>{rink.address}</h5>
            <h6
              className={
                rink.status === 3
                  ? "greenStatus"
                  : rink.status === 2
                  ? "yellowStatus"
                  : "redStatus"
              }
            >
              {rink.status}
            </h6>

            <p>{rink.note}</p>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button
                color="default"
                onClick={() => {
                  this.setState({ setOpen: true });
                  this.props.dispatch({
                    type: "ADD_FAVORITE",
                    payload: rink,
                  });
                }}
              >
                <Tooltip title="Add To Favorites">
                  <AddCircleIcon></AddCircleIcon>
                </Tooltip>
              </Button>
              <Button onClick={this.showInMapClicked}>
                <Tooltip title="Open In Google Maps">
                  <MapIcon></MapIcon>
                </Tooltip>
              </Button>
            </ButtonGroup>
          </Popup>
        ) : (
          false
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MapMarker);
