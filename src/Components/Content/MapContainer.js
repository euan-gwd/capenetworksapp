import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = { showingInfoWindow: false, activeMarker: {}, selectedPlace: {} };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <ClientContext.Consumer>
        {context => (
          <Map
            google={this.props.google}
            className="map"
            zoom={10}
            style={{ height: "100%", position: "relative", width: "100%" }}
            initialCenter={{ lat: -33.921829646, lng: 18.420998316 }}
            center={{ lat: -33.921829646, lng: 18.420998316 }}
            onClick={this.onMapClicked}
          >
            {context.customers.map(customer => (
              <Marker
                name={`${customer.Firstname} ${customer.Surname}`}
                position={{ lat: customer.Lat, lng: customer.Long }}
                key={customer.Id}
                onClick={this.onMarkerClick}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <Fragment>
                <h4>{this.state.selectedPlace.name}</h4>
              </Fragment>
            </InfoWindow>
          </Map>
        )}
      </ClientContext.Consumer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyChqqtvBFFuqXASpde2yUR69FmcKmPK5uY"
})(MapContainer);
