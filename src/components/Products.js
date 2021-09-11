import React from "react";
import "./Products.css";
import Product from "./Product";

export default function Products(props) {
  const { products } = props;
  return (
    <div className="products">
      {products.map((product, index) => (
        <Product
          key={index}
          product={product}
          onEditProduct={props.onEditProduct}
        />
      ))}
    </div>
  );
}
