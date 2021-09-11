import React from "react";
import { Redirect } from "react-router";
import "./AddProduct.css";
import { editProduct } from "./../actions/index";

class AddProduct extends React.Component {
  state = {
    product: {
      name: "",
      image: "",
      description: "",
      price: "",
      quantity: "",
    },
    toHome: false,
    editing: true,
    valid: true,
    errorMessage: null,
  };

  componentDidMount() {
    if (this.props.product && this.state.editing) {
      this.setState({
        product: this.props.product,
        editing: false,
      });
      this.forceUpdate();
    }
  }

  inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedProduct = { ...this.state.product };
    updatedProduct[name] = value;
    this.setState({
      product: updatedProduct,
    });
  };

  isNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);

  validateInput = () => {
    let valid = true;
    const name = this.state.product.name.trim();
    const price = this.state.product.price;
    const quantity = this.state.product.quantity;
    if (name.length === 0) {
      valid = false;
      this.setState({
        errorMessage: "Name cannot be empty!",
      });
      return valid;
    }
    if (!this.isNumeric(price) || price < 0) {
      valid = false;
      this.setState({
        errorMessage: "Please enter a valid price!",
      });
      return valid;
    }
    if (isNaN(quantity) || quantity.length === 0) {
      valid = false;
      this.setState({
        errorMessage: "Please enter a valid number for quantity",
      });
      return valid;
    }
    return valid;
  };

  addProductHandler = (e) => {
    e.preventDefault();
    const validData = this.validateInput();
    if (validData) {
      if (this.state.editing) {
        this.props.onAddProduct(this.state.product);
      } else {
        const { store } = this.props;
        const { products } = store.getState();
        console.log(products);
        const index = products.findIndex(
          (prod) => prod.name === this.props.product.name
        );
        store.dispatch(editProduct(this.state.product, index));
      }
      this.setState({
        toHome: true,
      });
    }
  };

  render() {
    return (
      <div>
        {!this.props.user ? (
          <Redirect to="/login" />
        ) : !this.state.toHome ? (
          <div>
            <h1 style={{ textAlign: "center", marginTop: 16 }}>Add Product</h1>
            {this.state.errorMessage ? (
              <div className="error">{this.state.errorMessage}</div>
            ) : (
              ""
            )}
            <form className="product-form">
              <div className="form-control">
                <label>Title</label>
                <input
                  className="product-title"
                  type="text"
                  name="name"
                  value={this.state.product.name}
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
              <div className="form-control">
                <label>ImageUrl</label>
                <input
                  className="product-image"
                  type="text"
                  name="image"
                  value={this.state.product.image}
                  onChange={this.inputChangeHandler}
                />
              </div>
              <div className="form-control">
                <label>Description</label>
                <textarea
                  className="product-desc"
                  name="description"
                  rows="5"
                  value={this.state.product.description}
                  onChange={this.inputChangeHandler}
                ></textarea>
              </div>
              <div className="form-control">
                <label>Price</label>
                <input
                  className="product-price"
                  type="number"
                  name="price"
                  value={this.state.product.price}
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
              <div className="form-control">
                <label>Quantity</label>
                <input
                  className="product-price"
                  type="number"
                  name="quantity"
                  value={this.state.product.quantity}
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
              <button
                className="btn"
                type="submit"
                onClick={this.addProductHandler}
              >
                Add Product
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

export default AddProduct;
