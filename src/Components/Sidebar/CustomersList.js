import React, { Component, Fragment } from "react";
import { ClientContext } from "../App";
import CustomerDetails from "./CustomerDetails";
import "./CustomerStyles.css";

class CustomersList extends Component {
  render() {
    return (
      <section className="customersWrapper">
        <label className="Label">Customers:</label>
        <ClientContext.Consumer>
          {context => (
            <Fragment>
              <ul className="list">
                {context.customers.map(customer => (
                  <CustomerDetails
                    key={customer.Id}
                    details={customer}
                    removeCustomer={context.remove}
                  />
                ))}
              </ul>
              <button className="listAction" onClick={context.reset}>
                reset list
              </button>
            </Fragment>
          )}
        </ClientContext.Consumer>
      </section>
    );
  }
}

export default CustomersList;
