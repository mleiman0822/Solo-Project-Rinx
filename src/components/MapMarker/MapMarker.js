import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import "./MapMarker.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MapIcon from "@material-ui/icons/Map";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";
import ModalImage from "react-modal-image";

import "mapbox-gl/dist/mapbox-gl.css";

export class MapMarker extends Component {
  state = {
    popUp: false,
    setOpen: false,
    isOpen: false,
  };

  showInMapClicked = () => {
    window.open(
      "https://maps.google.com?q=" +
        this.props.rink.latitude +
        "," +
        this.props.rink.longitude
    );
  };

  editRink = () => {};

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  handlePopUp = () => {
    this.props.moveMap(
      Number(this.props.rink.latitude) + 0.05,
      Number(this.props.rink.longitude)
    );
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
        {rink.status === 3 ? (
          <Marker
            className="mapboxgl-marker"
            key={rink.id}
            latitude={Number(rink.latitude)}
            longitude={Number(rink.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                alt={rink.name}
              />
            </div>
          </Marker>
        ) : rink.status === 2 ? (
          <Marker
            className="mapboxgl-marker"
            key={rink.id}
            latitude={Number(rink.latitude)}
            longitude={Number(rink.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png"
                alt={rink.name}
              />
            </div>
          </Marker>
        ) : (
          <Marker
            className="mapboxgl-marker"
            key={rink.id}
            latitude={Number(rink.latitude)}
            longitude={Number(rink.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                alt={rink.name}
              />
            </div>
          </Marker>
        )}

        {this.state.popUp !== false ? (
          <Popup
            style={{ borderRadius: "15px" }}
            className="popUp"
            latitude={Number(rink.latitude)}
            longitude={Number(rink.longitude)}
            onClose={this.closePopUp}
            closeButton={true}
            closeOnClick={false}
            offsetLeft={-3}
            offsetTop={-18}
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
            <p>
              <p className="image">
                {rink.image === "" ? (
                  "No Image To Display"
                ) : (
                  <img
                    style={{ borderRadius: "10px", cursor: "pointer" }}
                    className="rinkImgs"
                    src={rink.image}
                    alt={rink.name}
                    onClick={this.handleShowDialog}
                  />
                )}
              </p>
              {rink.latitude} {rink.longitude}
            </p>

            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button
                color="default"
                onClick={() => {
                  swal({
                    title: "Added To Favorites",
                    text:
                      "The rink you have chosen has been successfully added to your favorites view.",
                    icon: "success",
                    buttons: true,
                  });
                  this.setState({ setOpen: true });
                  this.props.dispatch({
                    type: "ADD_FAVORITE",
                    payload: rink,
                  });
                }}
              >
                <Tooltip title="Add To Favorites">
                  <AddCircleIcon onClick={this.closePopUp}></AddCircleIcon>
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
