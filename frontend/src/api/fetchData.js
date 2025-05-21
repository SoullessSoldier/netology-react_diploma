import axios from "axios";
import {
  BASE_URL,
  topSalesUrl,
  categoriesUrl,
  itemsUrl,
  orderUrl,
} from "@/backend_urls";

const TIMEOUT_MS = parseInt(import.meta.env.VITE_REQUEST_TIMEOUT_MS) || 10000;

// Функция запроса к API с использованием Axios
export const fetchData = async ({ mode = "", params = null, body = null }) => {
  try {
    let url = "";
    switch (mode) {
      case "topSales":
        url = topSalesUrl;
        break;
      case "categories":
        url = categoriesUrl;
        break;
      case "products":
        url = itemsUrl;
        break;
      case "productItem":
        url = `${itemsUrl}/${params.productId}`;
        break;
      case "order":
        url = orderUrl;
        break;
      default:
        url = "";
    }

    const config = {
      baseURL: BASE_URL,
      timeout: TIMEOUT_MS,
    };

    if (mode !== "productItem" && params) {
      config.params = { ...params };
    }

    if (url) {
      let response;
      if (mode !== "order") {
        response = await axios.get(url, config);
      } else {
        const data = { ...body };
        response = await axios.post(url, data, config);
      }

      if (response.status >= 400) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Timeout exceeded");
    }
    throw error;
  }
};
