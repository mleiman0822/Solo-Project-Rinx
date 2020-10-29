import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { connect } from "react-redux";

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
        <Marker
          key={favorite.id}
          latitude={Number(favorite.latitude)}
          longitude={Number(favorite.longitude)}
        >
          <div className="map-marker">
            <img
              style={{ cursor: "pointer" }}
              onClick={this.handlePopUp}
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
              alt={favorite.note}
            />
          </div>
        </Marker>
        {this.state.popUp !== false ? (
          <Popup
            className="popUp"
            latitude={Number(favorite.latitude)}
            longitude={Number(favorite.longitude)}
            onClose={this.closePopUp}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
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
            <button
              onClick={() => {
                this.setState({ setOpen: true });
                this.props.dispatch({
                  type: "DELETE_FAVORITE",
                  payload: favorite.id,
                });
              }}
            >
              Remove From Favorites
            </button>
            <button onClick={this.showInMapClicked}>Open in Google Maps</button>
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
