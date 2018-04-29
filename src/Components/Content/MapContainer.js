import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import userIcon from "../../Images/group.png";
import "./MapContainer.css";

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
      showingInfoWindow: true,
      centerMap: props.position
    });
  };

  createMarker(latlng, google, map, maxDistance = 10) {
    let marker = new google.maps.Marker({
      position: latlng,
      map: map,
      zIndex: Math.round(latlng.lat() * -100000) << 5
    });

    console.log(maxDistance);

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

    google.maps.event.trigger(marker, circle, "click");
    return marker;
  }

  onMapClicked = (props, map, clickEvent) => {
    const { google } = props;
    const { maxDistance } = this.props;
    let marker = null;

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        centerMap: { lat: -33.921829646, lng: 18.420998316 },
        mapZoom: 10
      });
    }

    //call function to create marker
    if (marker) {
      marker.setMap(null);
      marker = null;
    }

    marker = this.createMarker(clickEvent.latLng, google, map, maxDistance);
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
                name={`${customer.Firstname} ${customer.Surname}`}
                title={`${customer.Firstname} ${customer.Surname}`}
                position={{
                  lat: customer.Lat,
                  lng: customer.Long
                }}
                key={customer.Id}
                onClick={this.onMarkerClick}
                icon={userIcon}
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
