import {
  LOAD_TOPSALES_FAILURE,
  LOAD_TOPSALES_REQUEST,
  LOAD_TOPSALES_SUCCESS,
} from "@/actions/actions";

const initialState = {
  topSales: [],
  loading: false,
  error: null,
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOPSALES_REQUEST:
      return { ...state, loading: true };
    case LOAD_TOPSALES_SUCCESS:
      return {
        ...state,
        topSales: action.payload,
        loading: false,
      };
    case LOAD_TOPSALES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
