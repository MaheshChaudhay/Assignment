import React, { Component } from "react";
import { Redirect } from "react-router";
import "./Product.css";

class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
      name: "",
    },
    toHome: false,
    errorMessage: null,
  };

  inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedUser = { ...this.state.user };
    updatedUser[name] = value;
    this.setState({
      user: updatedUser,
    });
  };

  validateInput = () => {
    let valid = true;
    const name = this.state.user.name.trim();
    const email = this.state.user.email.trim();
    if (name.length === 0 || email.length === 0) {
      valid = false;
      this.setState({
        errorMessage: "Please enter a valid name or email!",
      });
      return valid;
    }
    return valid;
  };

  loginHandler = () => {
    if (this.validateInput()) {
      this.props.onLogin(this.state.user);
      this.setState({
        toHome: true,
      });
    }
  };
  render() {
    return (
      <div>
        {!this.state.toHome ? (
          <div>
            <h1 style={{ textAlign: "center", marginTop: 20 }}>Login</h1>
            <form className="product-form" style={{ width: "40%" }}>
              {this.state.errorMessage ? (
                <div className="error">{this.state.errorMessage}</div>
              ) : (
                ""
              )}
              <div className="form-control">
                <label>Name</label>
                <input
                  className="product-title"
                  type="text"
                  name="name"
                  value={this.state.user.name}
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
              <div className="form-control">
                <label>Email</label>
                <input
                  className="product-title"
                  type="email"
                  name="email"
                  value={this.state.user.email}
                  onChange={this.inputChangeHandler}
                  required
                />
                <label>Password</label>
                <input
                  className="product-title"
                  type="password"
                  name="password"
                  value={this.state.user.password}
                  onChange={this.inputChangeHandler}
                />
              </div>
              <button className="btn" type="button" onClick={this.loginHandler}>
                Login
              </button>
            </form>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default Login;
