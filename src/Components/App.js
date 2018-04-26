import React, { Component } from "react";
import "./App.css";
import MapContainer from "./MapContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-sidebar">test</div>
        <div className="App-body">
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
