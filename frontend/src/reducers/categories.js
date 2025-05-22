import {
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  SET_CURRENT_CATEGORY,
} from "@/actions/actions";
import { ALL_CATEGORY_ID } from "@/config/configParams";

const initialState = {
  categories: [
    {
      id: ALL_CATEGORY_ID,
      title: "Все",
    },
  ],
  currentCategory: ALL_CATEGORY_ID,
  loading: false,
  error: null,
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...initialState.categories, ...action.payload],
        loading: false,
      };
    case LOAD_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_CURRENT_CATEGORY:
      return { ...state, loading: false, currentCategory: action.payload };
    default:
      return state;
  }
}
