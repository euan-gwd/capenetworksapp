import React, { Component } from "react";
import { ClientContext } from "../App";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <ClientContext.Consumer>
        {customers => (
          <Map
            google={this.props.google}
            className="map"
            zoom={10}
            style={{ height: "100%", position: "relative", width: "100%" }}
            initialCenter={{ lat: -33.918861, lng: 18.4233 }}
          >
            {customers.map(customer => (
              <Marker
                Name={customer.Surname}
                position={{ lat: customer.Lat, lng: customer.Long }}
                key={customer.Id}
              />
            ))}
          </Map>
        )}
      </ClientContext.Consumer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyChqqtvBFFuqXASpde2yUR69FmcKmPK5uY"
})(MapContainer);
