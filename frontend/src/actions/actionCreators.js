import {
  LOAD_TOPSALES_REQUEST,
  LOAD_TOPSALES_SUCCESS,
  LOAD_TOPSALES_FAILURE,
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  SET_CURRENT_CATEGORY,
  RESET_CATEGORY,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
  RESET_PRODUCTS,
  UPDATE_SEARCH_STRING,
  SET_NAVIGATE_FROM_HEADER,
  LOAD_PRODUCTITEM_FAILURE,
  LOAD_PRODUCTITEM_REQUEST,
  LOAD_PRODUCTITEM_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  RESTORE_CART_FROM_STORAGE,
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

export function resetCategory({ categoryId, searchString }) {
  return { type: RESET_CATEGORY, payload: { categoryId, searchString } };
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

export function resetProducts(searchString) {
  return { type: RESET_PRODUCTS, payload: searchString };
}

export function updateSearchString(searchString) {
  return { type: UPDATE_SEARCH_STRING, payload: searchString };
}

export function setNavigateFromHeader(flag) {
  return { type: SET_NAVIGATE_FROM_HEADER, payload: flag };
}

export function loadProductItemRequest({ productId }) {
  return { type: LOAD_PRODUCTITEM_REQUEST, payload: { productId } };
}

export function loadProductItemFailure(error) {
  return { type: LOAD_PRODUCTITEM_FAILURE, payload: error.message };
}

export function loadProductItemSuccess(productItem) {
  return { type: LOAD_PRODUCTITEM_SUCCESS, payload: productItem };
}

export function addToCart(item) {
  return { type: ADD_TO_CART, payload: item };
}

export function removeFromCart(item) {
  return { type: REMOVE_FROM_CART, payload: item };
}

export function clearCart() {
  return { type: CLEAR_CART };
}

export function restoreCartFromStorage(cartItems) {
  return { type: RESTORE_CART_FROM_STORAGE, payload: cartItems };
}
