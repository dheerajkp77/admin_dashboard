
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

export const signup = async (body) => {
  return await http.post(`/auth/signup`, body);
};

export const verifyOTP = async (body) => {
  return await http.put(`/auth/verifyOtp`, body);
};

export const resendOTP = async (body) => {
  return await http.put(`/auth/resendOtp`, body);
};

export const forgotPassword = async (body) => {
  return await http.post(`/auth/forgotPassword`, body);
};

export const logOut = async () => {
  return await http.post(`/auth/logout`);
};

export const customerEditProfile = async (body) => {
  return await http.put(`/auth/editProfile`, body);
};

export const changePassword = async (body) => {
  return await http.put(`/auth/changePassword`, body);
};

export const customerProfileView = async () => {
  return await http.get(`/auth/profile`);
};

/********************* AUTHENTICATION ENDS *********************/

/********************* ADMIN SERVICES STARTS *********************/

// dashboard api start //
export const adminDashboardCounts = async () => {
  return await http.get(`/admin/dashboard/count`);
};

export const dashboardGraphData = async (year) => {
  return await http.get(`/admin/dashboard/graph/${year}`);
};
// dashboard api end //

// User api start//
export const adminUserList = async (query) => {
  return await http.get(`/admin/user/list`, {
    params: {
      pageNo: query?.page,
      pageLimit: query?.limit,
      roleId: query?.roleId,
      state: query?.state,
      search: query?.search.trim(),
    },
  });
};

export const adminBannerList = async (query) => {
  return await http.get(`/admin/blog/list`, {
    params: {
      pageNo: query?.page,
      pageLimit: query?.limit,
      state: query?.state,
      search: query?.search.trim(),
    },
  });
};

export const addBannerAdmin = async (body) => {
  return await http.post(`/admin/blog/add`, body);
};

export const deleteBannerAdmin = async (id) => {
  return await http.delete(`/admin/blog/delete/${id}`);
};

export const bannerDetailAdmin = async (id) => {
  return await http.get(`/admin/blog/view/${id}`);
};

export const editBannerAdmin = async (body) => {
  return await http.put(`/admin/blog/edit`, body);
};

export const adminUserView = async (id) => {
  return await http.get(`/admin/user/view/${id}`);
};

export const adminUserUpdate = async (id, body) => {
  return await http.put(`/admin/user/changeState/${id}`, body);
};

export const adminUserBan = async (id, body) => {
  return await http.put(`/admin/user/ban/${id}`, body);
};

export const adminBrandList = async (query) => {
  return await http.get(`/admin/brand/admin-brand-list`, {
    params: {
      state: query?.state,
      search: query?.search,
      pageNo: query?.page,
      pageLimit: query?.limit,
    },
  });
};

export const adminBrandStatus = async (id, body) => {
  return await http.put(`/admin/brand/brand-state-update/${id}`, body);
};

export const adminBrandView = async (id) => {
  return await http.get(`/admin/brand/brand-details/${id}`);
};

export const adminCreateBrand = async (body) => {
  return await http.post(`/admin/brand/add-brand`, body);
};

export const adminUpdateBrand = async (id, body) => {
  return await http.put(`/admin/brand/edit-brand/${id}`, body);
};
// user api end //

// logger api start //
export const errorLogList = async (query) => {
  return await http.get(`/admin/logs/errorList`, {
    params: { pageNo: query?.page, pageLimit: query?.limit },
  });
};

export const logSingleDelete = async (id) => {
  return await http.delete(`/admin/logs/delete/${id}`);
};

export const logAllDelete = async () => {
  return await http.delete(`/admin/logs/deleteAll`);
};

export const emailQueueList = async (query) => {
  return await http.get(`/admin/emaillog/list`, {
    params: {
      state: query?.state,
      search: query?.search,
      pageNo: query?.page,
      pageLimit: query?.limit,
    },
  });
};

export const emailQueueView = async (id) => {
  return await http.get(`/admin/emaillog/view/${id}`);
};

export const emailSingleDelete = async (id) => {
  return await http.delete(`/admin/emaillog/delete/${id}`);
};

export const emailAllDelete = async () => {
  return await http.delete(`/admin/emaillog/deleteAll`);
};

export const loginActivityList = async (query) => {
  return await http.get(`/admin/loginLogs/list`, {
    params: {
      state: query?.state,
      search: query?.search,
      pageNo: query?.page,
      pageLimit: query?.limit,
    },
  });
};

export const loginActivityView = async (id) => {
  return await http.get(`/admin/loginLogs/view/${id}`);
};

export const loginAllDelete = async () => {
  return await http.delete(`/admin/loginLogs/deleteAll`);
};
// logger api end//

// cms api start //

export const adminCmsList = async (query) => {
  return await http.get(`/admin/cms`, {
    params: {
      state: query?.state,
      search: query?.search,
      pageNo: query?.page,
      pageLimit: query?.limit,
    },
  });
};

export const adminCmsView = async (id) => {
  return await http.get(`/admin/cms/detail/${id}`);
};

export const adminCreateCms = async (body) => {
  return await http.post(`/admin/cms/add`, body);
};

export const adminUpdateCMS = async (id, body) => {
  return await http.put(`/admin/cms/update/${id}`, body);
};

export const adminDeleteCMS = async (id) => {
  return await http.delete(`/admin/cms/softDelete/${id}`);
};
// cms api end //

/********************* ADMIN SERVICES ENDS *********************/

/********************* USER SERVICES STARTS *********************/

export const staticPages = async (typeId) => {
  return await http.get(`/pages/cms/${typeId}`);
};

/********************* USER SERVICES ENDS *********************/

/********************* Admim single upload Image *********************/
export const imageUpload = async (body) => {
  return await http.post(`/upload`, body);
};
export const getImageApi = async (fileId) => {
  return await http.post(`/getImg/fileId=${fileId}`);
};

/********************* Admim single upload Image End *********************/

/********************* Admim product  *********************/

export const adminProductList = async (query) => {
  return await http.get(`/admin/product/list`, {
    params: {
      pageNo: query?.page,
      pageLimit: query?.limit,
      stateId: query?.state,
      search: query?.search,
    },
  });
};

export const bannerListUser = async () => {
  return await http.get(`/blog/list`);
};

export const userProductList = async (body) => {
  return await http.post(`/product/list`, body);
};

export const adminProductView = async (id) => {
  return await http.get(`/admin/product/detail/${id}`);
};

// /product/detail/6620e2ad442af55c040b5eb9

export const userProductDetail = async (id) => {
  return await http.get(`/product/detail/${id}`);
};

export const contactus = async (body) => {
  return await http.post(`/contactUs/add`, body);
};

export const tshirtRequest = async (body) => {
  return await http.post(`/users/request`, body);
};

export const adminRequest = async (query) => {
  return await http.get(`/admin/requests`, {
    params: {
      pageNo: query.page,
      pageLimit: query.limit,
      search: query.search,
      state: query.state,
    },
  });
};

export const userAddToCart = async (body) => {
  return await http.post(`/users/cart/add-to-cart`, body);
};

export const userCartList = async () => {
  return await http.get(`/users/cart/my-cart-list`);
};

export const userUpdateCart = async (body) => {
  return await http.put(`/users/cart/update-cart`, body);
};

export const userDeleteCartItem = async (id) => {
  return await http.delete(`/users/cart/remove-product/${id}`);
};

export const adminRequestView = async (id) => {
  return await http.get(`/admin/request/detail/${id}`);
};

export const adminRequestApprove = async (body) => {
  return await http.post(`/admin/accept`, body);
};

export const adminRequestReject = async (body) => {
  return await http.post(`/admin/reject`, body);
};

export const addProductAdmin = async (body) => {
  return await http.post(`/admin/product/add`, body);
};

export const adminProductDetails = async (id) => {
  return await http.get(`/admin/product/detail/${id}`);
};

export const deleteProductImage = async (id) => {
  return await http.delete(`/admin/product/image/${id}`);
};

export const adminEditProduct = async (id, body) => {
  return await http.put(`/admin/product/update/${id}`, body);
};

export const adminDeleteProduct = async (id) => {
  return await http.delete(`/admin/product/softDelete/${id}`);
};

export const adminUpdateStateProduct = async (id, body) => {
  return await http.put(`/admin/product/update/${id}`, body);
};

export const adminOrderDetail = async (id) => {
  return await http.get(`--------------${id}`);
};

export const editAddress = async (id, body) => {
  return await http.put(`/auth/address/${id}`, body);
};

export const deleteAddress = async (id) => {
  return await http.delete(`/auth/address/${id}`);
};

export const addCard = async (body) => {
  return await http.post(`/users/payment/addCard`, body);
};
export const addPaymentMethod = async (body) => {
  return await http.post(`/users/payment/addCard`, body);
};

export const cardList = async () => {
  return await http.get(`/users/payment/cardList`);
};

export const deletePaymentMethod = async (id) => {
  return await http.delete(`/users/payment/deleteCard/${id}`);
};

/**************************FAQ*****************************/
export const faqList = async (page) => {
  return await http.get(`/admin/faq/list`, {
    params: {
      pageNo: page,
      pageLimit: 10,
    },
  });
};
export const updateFaq = async (id, body) => {
  return await http.put(`/admin/faq/edit/${id}`, body);
};
export const addFaq = async (body) => {
  return await http.post(`/admin/faq/add`, body);
};
export const detailFaq = async (id) => {
  return await http.get(`/admin/faq/detail/${id}`);
};

export const deleteFaq = async (id) => {
  return await http.delete(`/admin/faq/delete/${id}`);
};
export const updateFaqState = async (body) => {
  return await http.put(`/admin/faq/updateState`, body);
};
export const adminCreditList = async (query) => {
  return await http.get(`/admin/wallet`, {
    params: {
      state: query?.state,
      pageNo: query?.page,
      pageLimit: query?.perPage,
      search: query?.search,
    },
  });
};

export const userFaq = async () => {
  return await http.get(`/pages/faq`);
};

export const cartList = async () => {
  return await http.get(`/users/cart/my-cart-list`);
};
