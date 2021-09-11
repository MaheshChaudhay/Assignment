export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    products: products,
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product: product,
  };
}

export function editProduct(product, productIndex) {
  return {
    type: EDIT_PRODUCT,
    product: product,
    index: productIndex,
  };
}
