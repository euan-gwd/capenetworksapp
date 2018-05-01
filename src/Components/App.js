import React, { Component } from "react";
import CustomersList from "./Sidebar/CustomersList.js";
import SearchFilter from "./Sidebar/SearchBar.js";
import MapContainer from "./Content/MapContainer.js";
import customerData from "../Data/FE Technical Test - data.json";
import "./App.css";

export const ClientContext = React.createContext();

const customersList = customerData.map(customer => {
  const Fullname = `${customer.Firstname} ${customer.Surname}`;
  const Id = `${customer.Id}`;
  const Location = {
    lat: customer.Lat,
    lng: customer.Long
  };
  return { Id, Fullname, Location };
});

class App extends Component {
  state = {
    customers: customerData,
    remove: key => {
      const decreaseList = [...this.state.customers];
      const index = decreaseList.findIndex(customer => customer.Id === key);
      decreaseList.splice(index, 1);
      this.setState({ customers: decreaseList });
    },
    reset: () => {
      this.setState({ customers: customersList });
    },
    maxDistance: 5000
  };

  componentDidMount = () => {
    const sessionStorageRef = sessionStorage.getItem(`savedData`);
    sessionStorageRef
      ? this.setState({ customers: JSON.parse(sessionStorageRef) })
      : this.setState({ customers: customersList });
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
