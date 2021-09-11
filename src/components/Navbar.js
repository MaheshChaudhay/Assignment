import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

class Navbar extends Component {
  state = {
    searchValue: "",
  };

  inputChangeHandler = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };
  render() {
    return (
      <div className="nav">
        <ul className="left">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              exact
              activeStyle={{ color: "yellow" }}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-product"
              exact
              className="nav-link"
              activeStyle={{ color: "yellow" }}
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <input
              type="text"
              onChange={this.inputChangeHandler}
              value={this.state.searchValue}
            />
            <button
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onSearch(this.state.searchValue)}
            >
              Search
            </button>
          </li>
        </ul>
        {!this.props.login ? (
          <div className="right">
            <NavLink
              to="login"
              className="nav-link"
              exact
              activeStyle={{ color: "yellow" }}
            >
              Login
            </NavLink>
          </div>
        ) : (
          <div className="right">
            <NavLink to="/" className="nav-link" onClick={this.props.logout}>
              {this.props.user.name}
              <span style={{ marginLeft: "20px" }}>Logout</span>
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
