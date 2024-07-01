const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_PRODUCTS":
      return {
        ...state,
        products: [...state.products, state.payload],
      };

    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "DELETE_PRODUCTS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
