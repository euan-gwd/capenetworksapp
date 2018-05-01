import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import customerIcon from "../../Images/userLocation.png";
import "./MapContainerStyles.css";

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
    this.resetSearchCircle();
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  resetSearchCircle() {
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

  getMarkersFromMap(customerLocations, google) {
    let markers = [];
    for (let i = 0; i < customerLocations.length; i++) {
      const Fullname = customerLocations[i].props.name;
      const latLng = new google.maps.LatLng(
        customerLocations[i].props.position.lat,
        customerLocations[i].props.position.lng
      );
      const Id = Number(customerLocations[i].props.label);
      const marker = { Id, Fullname, latLng };
      markers.push(marker);
    }
    return markers;
  }

  onMapClicked = (props, map, clickEvent) => {
    const { google, maxDistance } = props;
    const { getSearchResult } = this.props;

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        centerMap: { lat: -33.921829646, lng: 18.420998316 },
        mapZoom: 10
      });
    }
    this.resetSearchCircle();

    searchCircle = this.createSearchCircle(
      clickEvent.latLng,
      google,
      map,
      maxDistance
    );

    const [customerLocations] = props.children;
    const markers = this.getMarkersFromMap(customerLocations, google);
    let searchResults = [];

    markers.forEach(marker => {
      if (
        google.maps.geometry.spherical.computeDistanceBetween(
          marker.latLng,
          clickEvent.latLng
        ) <= maxDistance
      ) {
        searchResults.push(marker);
      }
    });

    if (searchResults.length !== 0) {
      getSearchResult(searchResults);
    } else {
      alert("No Markers found within Search Area");
      this.resetSearchCircle();
      this.props.reset();
    }
  };

  render() {
    return (
      <ClientContext.Consumer className="container">
        {context => (
          <Map
            google={this.props.google}
            zoom={this.state.mapZoom}
            className="map"
            initialCenter={{ lat: -33.921829646, lng: 18.420998316 }}
            center={this.state.centerMap}
            onClick={this.onMapClicked}
            maxDistance={context.maxDistance}
          >
            {context.customers.map(customer => (
              <Marker
                name={`${customer.Firstname} ${customer.Surname}`}
                label={`${customer.Id}`}
                position={{ lat: customer.Lat, lng: customer.Long }}
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
