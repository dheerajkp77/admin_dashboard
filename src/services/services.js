
import axios from "axios";
import { store } from "../redux/store";

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
  return await http.post(`/auth/signin`, body);
};

