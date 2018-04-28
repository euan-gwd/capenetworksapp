import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  render() {
    return (
      <section>
        <label className="Label">Search Filter:</label>
        <form className="searchForm" onSubmit={this.onSubmit}>
          <input
            placeholder="Enter a max distance"
            ref={ref => (this.autocomplete = ref)}
            type="number"
            className="left"
          />
          <input type="submit" className="right" value="Filter" />
        </form>
      </section>
    );
  }
}

export default SearchBar;
