import React, { Component } from "react";
import "./SearchBarStyles.css";

class SearchFilter extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.getMaxDistance(this.input.value);
    this.input.value = null;
  };

  render() {
    return (
      <section>
        <label className="Label">Set new max search distance:</label>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter a number in km"
            type="number"
            ref={input => (this.input = input)}
            className="left"
          />
          <input type="submit" className="right" value="Confirm" />
        </form>
      </section>
    );
  }
}

export default SearchFilter;
