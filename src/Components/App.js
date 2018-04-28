import React, { Component } from "react";
import SearchBar from "./Sidebar/SearchBar.js";
import CustomersList from "./Sidebar/CustomersList.js";
import MapContainer from "./Content/MapContainer.js";
import customerData from "../Data/FE Technical Test - data.json";
import "./App.css";

export const ClientContext = React.createContext();

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
      this.setState({ customers: customerData });
    }
  };

  componentDidMount = () => {
    const sessionStorageRef = sessionStorage.getItem(`savedData`);
    sessionStorageRef
      ? this.setState({ customers: JSON.parse(sessionStorageRef) })
      : this.setState({ customers: customerData });
  };

  componentDidUpdate = (prevProps, prevState) => {
    sessionStorage.setItem(`savedData`, JSON.stringify(this.state.customers));
  };

  render() {
    return (
      <div className="App-Container">
        <header className="App-Header">
          <h3>Cape Networks Event Planner</h3>
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
