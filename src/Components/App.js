import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Sidebar/SearchBar.js";
import CustomersList from "./Sidebar/CustomersList.js";
import MapContainer from "./Content/MapContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks</h3>
        </header>
        <div className="App-Wrapper">
          <aside className="App-Sidebar">
            <SearchBar />
            <CustomersList />
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
