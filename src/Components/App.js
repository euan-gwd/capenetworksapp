import React, { Component } from "react";
import "./App.css";
import MapContainer from "./MapContainer";
import SearchBar from "./Sidebar/SearchBar";

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
            <section className="selectLabel">
              <label className="">Selected</label>
            </section>
            <section className="listLabel">
              <label className="">Listings</label>
            </section>
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
