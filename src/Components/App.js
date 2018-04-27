import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Sidebar/SearchBar.js";
import CustomersList from "./Sidebar/CustomersList.js";
import MapContainer from "./Content/MapContainer.js";
import customerData from "../Data/FE Technical Test - data.json";

class App extends Component {
  state = { customerData };
  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks Event</h3>
        </header>
        <div className="App-Wrapper">
          <aside className="App-Sidebar">
            <SearchBar />
            <CustomersList data={this.state.customerData} />
          </aside>
          <main className="App-Content">
            <MapContainer />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
