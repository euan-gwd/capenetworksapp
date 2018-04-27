import React from "react";
import "./CustomerStyles.css";

const Customer = ({ details }) => {
  return (
    <li>
      <div className="customerName">
        <span>{details.Firstname}</span>
        <span>{details.Surname}</span>
      </div>
    </li>
  );
};

export default Customer;
