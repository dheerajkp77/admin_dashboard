import axios from "axios";
import { store } from "../redux/store";
import { constant } from "../utils/constants";

/* INTERCEPTOR STARTS */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(
  function (config) {
    const token = store.getState()?.auth?.details?.token;
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
/* INTERCEPTOR ENDS */

/********************* AUTHENTICATION STARTS *********************/
export const signIn = async (body) => {
  return await http.post(`/auth/login`, body);
};

export const getCategories = async () => {
  return await http.get("/products/categories");
};

export const addProduct = async (body) => {
  return await http.post(`/products/add`, body);
};

export const getProducts = async (page) => {
  return await http.get(`/products`, {
    params: {
      skip: (page - 1) * constant.PER_PAGE_TEN,
      limit: constant.PER_PAGE_TEN,
    },
  });
};

export const getProductDetails = async (id) =>{
  return await http.get(`/products/${id}`)
} 

export const deleteProduct = async (id) =>{
  return await http.delete(`/products/${id}`)
}

export const editProduct = async (id, body) =>{
  return await http.put(`/products/${id}`, body)
}