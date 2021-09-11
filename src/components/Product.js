import React, { Component } from "react";
import { Redirect } from "react-router";
import "./Product.css";

class Product extends Component {
  state = {
    toEditPage: false,
  };

  makeEdit = () => {
    this.props.onEditProduct(this.props.product);
    this.setState({
      toEditPage: true,
    });
  };

  render() {
    const { product } = this.props;
    return this.state.toEditPage ? (
      <Redirect to="/add-product" />
    ) : (
      <div className="card">
        <div className="product-title">
          <h2>{product.name}</h2>
        </div>
        <div className="product-image">
          <img src={product.image} alt="" />
        </div>
        <div className="product-desc">
          <p>{product.description}</p>
        </div>
        <div className="product-price">
          <h4>
            &#8377;
            {product.price}
          </h4>
          <h4>Stock : {product.quantity}</h4>
        </div>
        <button
          className="btn"
          type="button"
          style={{ width: "30%", margin: "10px auto" }}
          onClick={this.makeEdit}
        >
          Edit
        </button>
      </div>
    );
  }
}

export default Product;
