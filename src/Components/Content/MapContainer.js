import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import customerIcon from "../../Images/userLocation.png";
import partyIcon from "../../Images/party.png";
import "./MapContainerStyles.css";

let searchMarker = null;
let searchCircle = null;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    centerMap: { lat: -33.921829646, lng: 18.420998316 },
    mapZoom: 10
  };

  onMarkerClick = (props, marker, e) => {
    this.resetSearch();
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  createSearchMarker(latlng, google, map) {
    let centerMarker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: partyIcon
    });

    centerMarker.setMap(map);
    return centerMarker;
  }

  resetSearch() {
    if (searchMarker && searchMarker !== null) {
      searchMarker.setMap(null);
      searchMarker = null;
    }

    if (searchCircle && searchCircle !== null) {
      searchCircle.setMap(null);
      searchCircle = null;
    }
  }

  createSearchCircle(latlng, google, map, maxDistance) {
    let circleSearch = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.025,
      map: map,
      center: latlng,
      radius: maxDistance
    });

    circleSearch.setMap(map);
    return circleSearch;
  }

  onMapClicked = (props, map, clickEvent) => {
    const { google, maxDistance } = props;

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        centerMap: { lat: -33.921829646, lng: 18.420998316 },
        mapZoom: 10
      });
    }

    this.resetSearch();

    searchMarker = this.createSearchMarker(clickEvent.latLng, google, map);
    searchCircle = this.createSearchCircle(
      clickEvent.latLng,
      google,
      map,
      maxDistance
    );

    let [customerLocations] = props.children;
    let markers = [];

    for (let i = 0; i < customerLocations.length; i++) {
      const Fullname = customerLocations[i].props.name;
      const Location = new google.maps.LatLng(
        customerLocations[i].props.position.lat,
        customerLocations[i].props.position.lng
      );
      const Id = Number(customerLocations[i].props.label);
      const marker = { Id, Fullname, Location };
      markers.push(marker);
    }

    let searchResults = [];

    markers.forEach(marker => {
      if (
        google.maps.geometry.spherical.computeDistanceBetween(
          marker.Location,
          clickEvent.latLng
        ) <= maxDistance
      ) {
        searchResults.push(marker);
      }
    });

    console.log(searchResults);
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
            maxDistance={context.maxDistance}
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
  apiKey: "AIzaSyChqqtvBFFuqXASpde2yUR69FmcKmPK5uY",
  libraries: ["geometry", "drawing"]
})(MapContainer);
