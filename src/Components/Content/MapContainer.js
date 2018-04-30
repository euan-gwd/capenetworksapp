import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import customerIcon from "../../Images/userLocation.png";
import partyIcon from "../../Images/party.png";
import "./MapContainer.css";

let marker,
  circle = null;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    centerMap: { lat: -33.921829646, lng: 18.420998316 },
    mapZoom: 10
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  createMarker(latlng, google, map) {
    let marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: partyIcon
    });

    marker.setMap(map);
    return marker;
  }

  createMarkerCircle(latlng, google, map, maxDistance) {
    let circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.05,
      map: map,
      center: latlng,
      radius: maxDistance
    });

    circle.setMap(map);
    return circle;
  }

  onMapClicked = (props, map, clickEvent) => {
    const { google } = props;
    const { maxDistance } = this.props;

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        centerMap: { lat: -33.921829646, lng: 18.420998316 },
        mapZoom: 10
      });
    }

    if (marker && marker !== null) {
      marker.setMap(null);
      marker = null;
    }

    if (circle && circle !== null) {
      circle.setMap(null);
      circle = null;
    }

    marker = this.createMarker(clickEvent.latLng, google, map);
    circle = this.createMarkerCircle(
      clickEvent.latLng,
      google,
      map,
      maxDistance
    );

    // const locations = customers.map(customer => {
    //   const Fullname = `${customer.Firstname} ${customer.Surname}`;
    //   const Id = `${customer.Id}`;
    //   const Location = {
    //     lat: customer.Lat,
    //     lng: customer.Long
    //   };
    //   return { Id, Fullname, Location };
    // });
  };

  render() {
    return (
      <ClientContext.Consumer>
        {context => (
          <Map
            google={this.props.google}
            className="map"
            zoom={this.state.mapZoom}
            style={{ height: "100%", position: "relative", width: "100%" }}
            initialCenter={{ lat: -33.921829646, lng: 18.420998316 }}
            center={this.state.centerMap}
            onClick={this.onMapClicked}
          >
            {context.customers.map(customer => (
              <Marker
                name={`${customer.Fullname}`}
                label={`${customer.Id}`}
                position={customer.Location}
                key={customer.Id}
                icon={customerIcon}
                onClick={this.onMarkerClick}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <Fragment>
                <h4 className="infoWindowText">
                  {this.state.selectedPlace.name}
                </h4>
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
