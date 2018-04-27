import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {};
  render() {
    return (
      <Map
        google={this.props.google}
        className="map"
        zoom={14}
        style={{ height: "100%", position: "relative", width: "100%" }}
        initialCenter={{ lat: -33.918861, lng: 18.4233 }}
      >
        <Marker onClick={this.onMarkerClick} name={"Current Location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyChqqtvBFFuqXASpde2yUR69FmcKmPK5uY",
  region: "ZA"
})(MapContainer);
