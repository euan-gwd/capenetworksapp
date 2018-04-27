import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  render() {
    return (
      <section>
        <label className="Label">Search</label>
        <form className="searchForm" onSubmit={this.onSubmit}>
          <input
            placeholder="Enter a location"
            ref={ref => (this.autocomplete = ref)}
            type="text"
            className="left"
          />
          <input type="submit" className="right" value="Go" />
        </form>
      </section>
    );
  }
}

export default SearchBar;
