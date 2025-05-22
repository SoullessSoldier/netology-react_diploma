import {
  SEND_ORDER_FAILURE,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  RESET_ORDER,
} from "@/actions/actions";

const initialState = {
  response: null,
  loading: false,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return { ...state, loading: true };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case SEND_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_ORDER:
      return { ...initialState };
    default:
      return state;
  }
}
