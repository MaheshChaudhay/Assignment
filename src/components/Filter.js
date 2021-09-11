import React, { Component } from "react";
import "./Filter.css";

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-products">
          <span className="filter-by"> Filter By Price </span>
          <select
            value={this.props.filterPrice}
            onChange={this.props.onPriceFilter}
          >
            <option>All</option>
            <option>{"< 10000"}</option>
            <option>{"< 5000"}</option>
            <option> {"< 2000"}</option>
            <option>{"> 2000"}</option>
            <option>{"> 5000"}</option>
            <option>{"> 10000"}</option>
          </select>
        </div>
        <div className="filter-products">
          <span>Filter By Quantity</span>
          <select
            value={this.props.filterquantity}
            onChange={this.props.onQuantityFilter}
          >
            <option>All</option>
            <option>{"< 100"}</option>
            <option>{"< 50"}</option>
            <option>{"< 20"}</option>
            <option>{"> 20"}</option>
            <option>{"> 50"}</option>
            <option>{"> 100"}</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
