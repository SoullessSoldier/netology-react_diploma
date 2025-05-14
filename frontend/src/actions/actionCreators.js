import {
  LOAD_TOPSALES_REQUEST,
  LOAD_TOPSALES_SUCCESS,
  LOAD_TOPSALES_FAILURE,
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  SET_CURRENT_CATEGORY,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
  //SET_CURRENT_PRODUCTS_OFFSET,
  RESET_PRODUCTS,
} from "./actions";

export function loadTopSalesRequest() {
  return { type: LOAD_TOPSALES_REQUEST };
}

export function loadTopSalesFailure(error) {
  return { type: LOAD_TOPSALES_FAILURE, payload: error.message };
}

export function loadTopSalesSuccess(topSalesItems) {
  return { type: LOAD_TOPSALES_SUCCESS, payload: topSalesItems };
}

export function loadCategoriesRequest() {
  return { type: LOAD_CATEGORIES_REQUEST };
}

export function loadCategoriesFailure(error) {
  return { type: LOAD_CATEGORIES_FAILURE, payload: error.message };
}

export function loadCategoriesSuccess(categories) {
  return { type: LOAD_CATEGORIES_SUCCESS, payload: categories };
}

export function setCurrentCategory(categoryId) {
  return { type: SET_CURRENT_CATEGORY, payload: categoryId };
}

export function loadProductsRequest(params) {
  return { type: LOAD_PRODUCTS_REQUEST, payload: params };
}

export function loadProductsFailure(error) {
  return { type: LOAD_PRODUCTS_FAILURE, payload: error.message };
}

export function loadProductsSuccess(products) {
  return { type: LOAD_PRODUCTS_SUCCESS, payload: products };
}
/*
export function setCurrentProductsOffset(offset) {
  return { type: SET_CURRENT_PRODUCTS_OFFSET, payload: offset };
}
*/
export function resetProducts() {
  return { type: RESET_PRODUCTS };
}
