import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Sidebar/SearchBar.js";
import CustomersList from "./Sidebar/CustomersList.js";
import MapContainer from "./Content/MapContainer.js";
import customerData from "../Data/FE Technical Test - data.json";

export const ClientContext = React.createContext(null);

class App extends Component {
  state = { value: customerData };
  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks Event</h3>
        </header>
        <ClientContext.Provider value={this.state.value}>
          <div className="App-Wrapper">
            <aside className="App-Sidebar">
              <SearchBar />
              <CustomersList />
            </aside>
            <main className="App-Content">
              <MapContainer />
            </main>
          </div>
        </ClientContext.Provider>
      </div>
    );
  }
}

export default App;
