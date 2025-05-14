import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  //SET_CURRENT_PRODUCTS_OFFSET,
  RESET_PRODUCTS,
} from "@/actions/actions";

const initialState = {
  products: [],
  currentOffset: 0,
  loading: false,
  error: null,
  showLoadMore: true,
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
    //case SET_CURRENT_PRODUCTS_OFFSET:
    //  return { ...state, loading: false, currentOffset: action.payload };
    case RESET_PRODUCTS:
      return { ...initialState };
    default:
      return state;
  }
}
