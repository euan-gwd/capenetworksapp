import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Sidebar/SearchBar.js";
import CustomersList from "./Sidebar/CustomersList.js";
import MapContainer from "./Content/MapContainer.js";
import customerData from "../Data/FE Technical Test - data.json";

export const ClientContext = React.createContext();

class App extends Component {
  state = {
    customers: customerData,
    remove: key => {
      const decreaseList = [...this.state.customers];
      const index = decreaseList.findIndex(customer => customer.Id === key);
      decreaseList.splice(index, 1);
      this.setState({ customers: decreaseList });
    }
  };
  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks Event</h3>
        </header>
        <ClientContext.Provider value={this.state}>
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
