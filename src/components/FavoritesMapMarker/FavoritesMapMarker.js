import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MapIcon from "@material-ui/icons/Map";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";

import "mapbox-gl/dist/mapbox-gl.css";

export class MapMarker extends Component {
  state = {
    popUp: false,
    setOpen: false,
    favorites: [],
  };

  showInMapClicked = () => {
    window.open(
      "https://maps.google.com?q=" +
        this.props.favorite.latitude +
        "," +
        this.props.favorite.longitude
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
    const favorite = this.props.favorite;
    return (
      <>
        {favorite.status === 3 ? (
          <Marker
            className="mapboxgl-marker"
            key={favorite.id}
            latitude={Number(favorite.latitude)}
            longitude={Number(favorite.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                alt={favorite.name}
              />
            </div>
          </Marker>
        ) : favorite.status === 2 ? (
          <Marker
            className="mapboxgl-marker"
            key={favorite.id}
            latitude={Number(favorite.latitude)}
            longitude={Number(favorite.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png"
                alt={favorite.name}
              />
            </div>
          </Marker>
        ) : (
          <Marker
            className="mapboxgl-marker"
            key={favorite.id}
            latitude={Number(favorite.latitude)}
            longitude={Number(favorite.longitude)}
            offsetLeft={-15}
            offsetTop={-32}
          >
            <div className="map-marker">
              <img
                style={{ cursor: "pointer" }}
                onClick={this.handlePopUp}
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                alt={favorite.name}
              />
            </div>
          </Marker>
        )}
        {this.state.popUp !== false ? (
          <Popup
            className="popUp"
            latitude={Number(favorite.latitude)}
            longitude={Number(favorite.longitude)}
            onClose={this.closePopUp}
            closeButton={true}
            closeOnClick={false}
            offsetLeft={-3}
            offsetTop={-18}
          >
            <h4>{favorite.name}</h4>
            <h5>{favorite.address}</h5>
            <h6
              className={
                favorite.status === 3
                  ? "greenStatus"
                  : favorite.status === 2
                  ? "yellowStatus"
                  : "redStatus"
              }
            >
              {favorite.status}
            </h6>

            <p>{favorite.note}</p>
            <p>
              <p className="image">
                {favorite.image === "" ? (
                  "No Image To Display"
                ) : (
                  <img
                    style={{ borderRadius: "10px", cursor: "pointer" }}
                    className="rinkImgs"
                    src={favorite.image}
                    alt={favorite.name}
                    onClick={this.handleShowDialog}
                  />
                )}
              </p>
              {favorite.latitude} {favorite.longitude}
            </p>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button
                color="secondary"
                onClick={() => {
                  swal({
                    title: "Removed From Favorites",
                    text:
                      "The rink you have chosen has been successfully removed from your favorites view.",
                    icon: "warning",
                    buttons: true,
                  });
                  this.setState({ setOpen: true });
                  this.props.dispatch({
                    type: "DELETE_FAVORITE",
                    payload: favorite.id,
                  });
                }}
              >
                <Tooltip title="Remove From Favorites">
                  <DeleteForeverIcon></DeleteForeverIcon>
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
