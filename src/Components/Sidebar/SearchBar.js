import React, { Component } from "react";
import "./SearchBar.css";

class SearchFilter extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.maxDistanceFilter(this.input.value);
  };

  render() {
    return (
      <section>
        <label className="Label">Set max distance radius:</label>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter a number in km"
            type="number"
            ref={input => (this.input = input)}
            className="left"
          />
          <input type="submit" className="right" value="Set" />
        </form>
      </section>
    );
  }
}

export default SearchFilter;
