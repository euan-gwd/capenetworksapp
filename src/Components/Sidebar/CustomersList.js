import React, { Component } from "react";
import data from "../../Data/FE Technical Test - data.json";
import CustomerDetails from "./CustomerDetails";
import "./CustomerStyles.css";

class CustomersList extends Component {
  state = { customers: data };
  render() {
    return (
      <section className="customersWrapper">
        <label className="Label">Customers:</label>
        <ul className="list">
          {this.state.customers.map((customer, index) => (
            <CustomerDetails key={index} details={customer} />
          ))}
        </ul>
      </section>
    );
  }
}

export default CustomersList;
