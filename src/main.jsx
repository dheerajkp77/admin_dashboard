
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { toastAlert } from "./utils/SweetAlert.js";
import { login } from "./redux/features/authSlice.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => {
        if (error?.response) {
          if (
            error.response?.status === 403 ||
            error.response?.status === 401
          ) {
            store.dispatch(login());
            toastAlert("error", error.response?.data?.message);
          } else {
            toastAlert("error", error?.response?.data?.message);
          }
        } else {
          toastAlert("error", error?.message);
        }
      },
    },
    mutations: {
      onError: (error) => {
        if (error?.response) {
          if (
            error.response?.status === 403 ||
            error.response?.status === 401
          ) {
            store.dispatch(login());
            toastAlert("error", error.response?.data?.message);
          } else {
            toastAlert("error", error?.response?.data?.message);
          }
        } else {
          toastAlert("error", error?.message);
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
