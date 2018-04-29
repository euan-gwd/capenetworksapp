import React from "react";
import "./CustomerStyles.css";

const Customer = ({ details, removeCustomer }) => {
  const customerFullName = `${details.Firstname} ${details.Surname}`;
  return (
    <li className="customerListItem">
      <div className="customerName">
        <div>
          <span>{`${details.Id}. `}</span>
          {customerFullName}
        </div>
        <button
          className="listAction"
          onClick={() => removeCustomer(details.Id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default Customer;
