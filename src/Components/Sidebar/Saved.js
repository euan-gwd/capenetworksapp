import React, { Component } from "react";
import "./Saved.css";

class SavedLocations extends Component {
  state = {};
  render() {
    return (
      <section className="savedWrapper">
        <label className="Label">Saved Locations:</label>
        <div className="list">1. 2. 3.</div>
      </section>
    );
  }
}

export default SavedLocations;
