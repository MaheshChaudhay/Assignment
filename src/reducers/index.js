import { ADD_PRODUCT, GET_PRODUCTS, EDIT_PRODUCT } from "../actions";

const initialProductsState = {
  products: [],
};

export default function products(state = initialProductsState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        products: action.products,
      };
    }
    case ADD_PRODUCT: {
      return {
        products: [action.product, ...state.products],
      };
    }

    case EDIT_PRODUCT: {
      const updtatedProducts = [...state.products];
      updtatedProducts[action.index] = action.product;
      return {
        products: updtatedProducts,
      };
    }
    default:
      return state;
  }
}
