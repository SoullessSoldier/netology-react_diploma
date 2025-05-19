import {
  LOAD_PRODUCTITEM_FAILURE,
  LOAD_PRODUCTITEM_REQUEST,
  LOAD_PRODUCTITEM_SUCCESS,
} from "@/actions/actions";

const initialState = {
  productItem: {},
  loading: false,
  error: null,
};

export default function productItemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTITEM_REQUEST:
      return { ...state, loading: true };
    case LOAD_PRODUCTITEM_SUCCESS:
      return {
        ...state,
        productItem: action.payload,
        loading: false,
      };
    case LOAD_PRODUCTITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
