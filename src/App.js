import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import React from "react";
import Login from "./components/Login";
import Filter from "./components/Filter";
import data from "./data";
import { getProducts, addProduct } from "./actions/index";

class App extends React.Component {
  state = {
    user: null,
    filterByPrice: "All",
    filterByQuantity: "All",
    editProduct: null,
    searchProduct: null,
    searchValue: "",
  };

  componentDidMount() {
    const { store } = this.props;
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    store.subscribe(() => {
      this.forceUpdate();
    });
    store.dispatch(getProducts(data));
    this.setState({
      user: user,
    });
  }

  addProductHandler = (product) => {
    this.props.store.dispatch(addProduct(product));
    <Redirect to={{ pathname: "/" }} />;
  };

  userLoginHandler = (newUser) => {
    const updatedUser = { ...newUser };
    updatedUser.isLogin = true;
    this.setState({
      user: updatedUser,
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  userLogoutHandler = () => {
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  };

  filterByPriceAndQuantity = (
    product,
    filterQuantityComparator,
    filterQuantityValue,
    filterPriceComparator,
    filterPriceValue
  ) => {
    let valid = null;
    if (filterPriceComparator === "<") {
      valid = product.price < parseInt(filterPriceValue) ? true : false;
    } else {
      valid = product.price > parseInt(filterPriceValue) ? true : false;
    }

    if (!valid) {
      return valid;
    }
    if (filterQuantityComparator === "<") {
      valid = product.quantity < parseInt(filterQuantityValue) ? true : false;
    } else {
      valid = product.quantity > parseInt(filterQuantityValue) ? true : false;
    }
    return valid;
  };

  getFilterByPrice(product, filterPriceComparator, filterPriceValue) {
    let valid = null;
    if (filterPriceComparator === "<") {
      valid = product.price < parseInt(filterPriceValue) ? true : false;
    } else {
      valid = product.price > parseInt(filterPriceValue) ? true : false;
    }
    return valid;
  }

  getFilterByQuantity(product, filterQuantityComparator, filterQuantityValue) {
    let valid = null;
    if (filterQuantityComparator === "<") {
      valid = product.quantity < parseInt(filterQuantityValue) ? true : false;
    } else {
      valid = product.quantity > parseInt(filterQuantityValue) ? true : false;
    }

    return valid;
  }

  getFilteredProducts = () => {
    const { products } = this.props.store.getState();
    const [filterPriceComparator, filterPriceValue] =
      this.state.filterByPrice.split(" ");
    const [filterQuantityComparator, filterQuantityValue] =
      this.state.filterByQuantity.split(" ");
    let filteredProducts = products.filter((product) => {
      if (filterPriceValue && filterQuantityValue) {
        return this.filterByPriceAndQuantity(
          product,
          filterQuantityComparator,
          filterQuantityValue,
          filterPriceComparator,
          filterPriceValue
        );
      } else if (filterPriceValue) {
        return this.getFilterByPrice(
          product,
          filterPriceComparator,
          filterPriceValue
        );
      } else if (filterQuantityValue) {
        return this.getFilterByQuantity(
          product,
          filterQuantityComparator,
          filterQuantityValue
        );
      } else {
        return true;
      }
    });
    return filteredProducts;
  };

  priceFilterHandler = (e) => {
    this.setState({
      filterByPrice: e.target.value,
    });
  };

  quantityFilterHandler = (e) => {
    this.setState({
      filterByQuantity: e.target.value,
    });
  };

  editProductHandler = (product) => {
    const productToBeEdit = { ...product };
    this.setState({
      editProduct: productToBeEdit,
    });
  };

  getSearchedProduct = () => {
    const { products } = this.props.store.getState();
    let searchResult;
    searchResult = products.filter(
      (product) => product.name.toLowerCase() === this.state.searchValue
    );
    return searchResult;
  };

  searchProductHandler = (value) => {
    this.setState({
      searchValue: value.trim().toLowerCase(),
    });
  };

  render() {
    let displayProducts = !this.state.searchValue
      ? this.getFilteredProducts()
      : this.getSearchedProduct();
    return (
      <Router>
        <div className="App">
          <Navbar
            user={this.state.user}
            login={this.state.user}
            logout={this.userLogoutHandler}
            onSearch={this.searchProductHandler}
          />
          <Switch>
            <Route path="/login">
              <Login onLogin={this.userLoginHandler} user={this.state.user} />
            </Route>
            <Route path="/add-product">
              <AddProduct
                user={this.state.user}
                onAddProduct={this.addProductHandler}
                product={this.state.editProduct}
                store={this.props.store}
              />
            </Route>
            {/* <Route path="/edit-product">
              <EditProduct user={this.state.user}/>
            </Route> */}
            <Route path="/">
              <Filter
                user={this.state.user}
                filterPrice={this.state.filterByPrice}
                filterQuantity={this.state.filterByQuantity}
                onPriceFilter={this.priceFilterHandler}
                onQuantityFilter={this.quantityFilterHandler}
              />
              <Products
                products={displayProducts}
                onEditProduct={this.editProductHandler}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
