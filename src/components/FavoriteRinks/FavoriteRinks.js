import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "../MapMarker/MapMarker";

// Grab some nice markers from:
// https://github.com/pointhi/leaflet-color-markers/tree/master/img

class Map extends Component {
  state = {
    viewport: {
      width: "500px",
      height: "500px",
      latitude: 46.877186, // Fargo, ND
      longitude: -96.789803,
      zoom: 10,
      showPopup: true,
      selectedRink: null,
      setSelectedRink: null,
      setSelectedMarker: null,
    },
  };

  setSelectedMarker = (index) => {
    this.setState({ selectedIndex: index });
  };
  closePopup = () => {
    this.setSelectedMarker(null);
  };
  openPopup = (index) => {
    this.setSelectedMarker(index);
  };
  render() {
    console.log(this.props);
    return (
      <div className="map-container">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          // mapStyle="mapbox://styles/mapbox/dark-v9"
          mapStyle="mapbox://styles/mleiman0822/ckgnxe6ei2mpb1aljxskabiuw"
          // this is from the react-map-gl examples. It updates our local state with
          // whatever the new map viewport is, after a user zooms or pans
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {this.props.rinks.map((rink) => (
            // Offset is required because images are drawn on the map at the top left corner...
            // but marker pins need to have their bottom 'point' on the location (so they need to

            // get shifted to the left and up! Depends on the size of the marker)
            <MapMarker rink={rink} />
          ))}
        </ReactMapGL>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
  rinks: state.rinkItemsReducer.rinks,
});
export default connect(mapStateToProps)(Map);
