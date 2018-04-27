import React, { Component } from "react";
import CustomerDetails from "./CustomerDetails";
import "./CustomerStyles.css";

class CustomersList extends Component {
  state = { customers: this.props.data };

  resetCustomerList = () => {
    this.setState({ customers: this.props.data });
  };

  removeCustomer = key => {
    const decreaseList = [...this.state.customers];
    const index = decreaseList.findIndex(customer => customer.Id === key);
    decreaseList.splice(index, 1);
    this.setState({ customers: decreaseList });
  };

  render() {
    return (
      <section className="customersWrapper">
        <label className="Label">Customers:</label>
        <ul className="list">
          {this.state.customers.map(customer => (
            <CustomerDetails
              key={customer.Id}
              details={customer}
              removeCustomer={this.removeCustomer}
            />
          ))}
        </ul>
        <button onClick={this.resetCustomerList}>Reset</button>
      </section>
    );
  }
}

export default CustomersList;
