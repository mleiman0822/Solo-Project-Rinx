import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import RinkMap from "../RinkMap/RinkMap";

export class MapMarker extends Component {
  render() {
    const rink = this.props.rink;
    return (
      <>
        <Marker
          key={rink.id}
          latitude={Number(rink.latitude)}
          longitude={Number(rink.longitude)}
        >
          <div className="map-marker">
            <img
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                /*                 this.setCurrentRink(rink);
                 */
              }}
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
              alt={rink.note}
            />
          </div>
        </Marker>
        <Popup
          latitude={Number(rink.latitude)}
          longitude={Number(rink.longitude)}
          onClose={this.closePopup}
          closeButton={true}
          closeOnClick={false}
          offsetTop={-30}
        >
          <p>{rink.name}</p>
        </Popup>
      </>
    );
  }
}

export default MapMarker;
