import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  RESET_PRODUCTS,
  UPDATE_SEARCH_STRING,
  SET_NAVIGATE_FROM_HEADER,
} from "@/actions/actions";

const initialState = {
  products: [],
  currentOffset: 0,
  loading: false,
  error: null,
  showLoadMore: true,
  searchString: "",
  navigateFromHeader: false,
};

export default function productsReducer(state = initialState, action) {
  const PRODUCTS_PER_REQUEST = parseInt(import.meta.env.PRODUCTS_PER_REQUEST) || 6;
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        currentOffset: state.currentOffset + action.payload.length,
        loading: false,
        showLoadMore: action.payload.length === PRODUCTS_PER_REQUEST,
      };
    case LOAD_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_PRODUCTS:
      return { ...initialState, searchString: action.payload || "" };
    case UPDATE_SEARCH_STRING:
      return { ...state, searchString: action.payload };
    case SET_NAVIGATE_FROM_HEADER:
      return { ...state, navigateFromHeader: action.payload };
    default:
      return state;
  }
}
