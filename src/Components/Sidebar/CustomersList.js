import React, { Component } from "react";
import { ClientContext } from "../App";
import CustomerDetails from "./CustomerDetails";
import "./CustomerStyles.css";

class CustomersList extends Component {
  // state = {};

  // removeCustomer = key => {
  //   const decreaseList = [...this.state.customers];
  //   const index = decreaseList.findIndex(customer => customer.Id === key);
  //   decreaseList.splice(index, 1);
  //   this.setState({ customers: decreaseList });
  // };

  render() {
    return (
      <section className="customersWrapper">
        <label className="Label">Customers:</label>
        <ClientContext.Consumer>
          {context => (
            <ul className="list">
              {context.customers.map(customer => (
                <CustomerDetails
                  key={customer.Id}
                  details={customer}
                  removeCustomer={context.remove}
                />
              ))}
            </ul>
          )}
        </ClientContext.Consumer>
      </section>
    );
  }
}

export default CustomersList;
