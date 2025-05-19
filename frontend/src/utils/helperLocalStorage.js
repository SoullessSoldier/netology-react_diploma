const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY || "cart";

export const writeToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
