import React from "react";
import "./CustomerStyles.css";

const Customer = ({ details, removeCustomer }) => {
  return (
    <li className="customerListItem">
      <div className="customerName">
        <div>
          <span>{`${details.Id}. `}</span>
          {`${details.Firstname} ${details.Surname}`}
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
