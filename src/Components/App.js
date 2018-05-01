import React, { Component } from "react";
import CustomersList from "./Sidebar/CustomersList.js";
import SearchFilter from "./Sidebar/SearchBar.js";
import MapContainer from "./Content/MapContainer.js";
import customerDB from "../Data/FE Technical Test - data.json";
import "./App.css";

export const ClientContext = React.createContext();

class App extends Component {
  state = {
    customers: customerDB,
    remove: key => {
      const decreaseList = [...this.state.customers];
      const index = decreaseList.findIndex(customer => customer.Id === key);
      decreaseList.splice(index, 1);
      this.setState({ customers: decreaseList });
    },
    reset: () => {
      this.setState({ customers: customerDB });
    },
    maxDistance: 5000
  };

  componentDidMount = () => {
    const sessionStorageRef = sessionStorage.getItem(`savedData`);
    sessionStorageRef
      ? this.setState({ customers: JSON.parse(sessionStorageRef) })
      : this.setState({ customers: customerDB });
  };

  componentDidUpdate = (prevProps, prevState) => {
    sessionStorage.setItem(`savedData`, JSON.stringify(this.state.customers));
  };

  maxDistanceFilter = item => {
    const maxRadius = Number(item) * 1000;
    this.setState({ maxDistance: maxRadius });
  };

  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks Event Planner</h3>
        </header>
        <ClientContext.Provider value={this.state}>
          <div className="App-Wrapper">
            <main className="App-Content">
              <MapContainer maxDistance={this.state.maxDistance} />
            </main>
            <aside className="App-Sidebar">
              <SearchFilter maxDistanceFilter={this.maxDistanceFilter} />
              <CustomersList />
            </aside>
          </div>
        </ClientContext.Provider>
      </div>
    );
  }
}

export default App;
