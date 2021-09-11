import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import products from "./reducers/index";

const store = createStore(products);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
