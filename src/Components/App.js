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
    maxDistance: 5000,
    remove: key => {
      const decreaseList = [...this.state.customers];
      const index = decreaseList.findIndex(customer => customer.Id === key);
      decreaseList.splice(index, 1);
      this.setState({ customers: decreaseList });
    },
    reset: () => {
      this.setState({ customers: customerDB });
    }
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

  getMaxDistance = result => {
    const maxRadius = Number(result) * 1000;
    this.setState({ maxDistance: maxRadius });
  };

  getSearchResult = results => {
    const filteredCustomerList = results.map(result => {
      const nameArr = result.Fullname.split(" ");
      const [Firstname, Surname] = nameArr;
      const Id = result.Id;
      const Lat = result.latLng.lat();
      const Long = result.latLng.lng();
      const searchResults = {
        Id,
        Firstname,
        Surname,
        Lat,
        Long
      };
      return searchResults;
    });
    this.setState({ customers: filteredCustomerList });
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
              <MapContainer
                maxDistance={this.state.maxDistance}
                getSearchResult={this.getSearchResult}
              />
            </main>
            <aside className="App-Sidebar">
              <SearchFilter getMaxDistance={this.getMaxDistance} />
              <CustomersList />
            </aside>
          </div>
        </ClientContext.Provider>
      </div>
    );
  }
}

export default App;
