import React, { Component } from "react";
import "./Selected.css";

class SelectedLocations extends Component {
  state = {};
  render() {
    return (
      <section className="selectedWrapper">
        <label className="Label">Selected Locations:</label>
        <div className="list">1. 2. 3.</div>
      </section>
    );
  }
}

export default SelectedLocations;
