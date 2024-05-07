
export const constant = Object.freeze({
  /*******************Roles******************/
  ADMIN: 1,
  USER: 2,
  SHOPPER: 3,

  /*****************Pagination*****************/
  PAGE_NO_ONE: 1,
  PER_PAGE_TEN: 10,
  PER_PAGE_NINE: 9,
  PER_PAGE_SIX: 6,
  PER_PAGE_FIVE: 5,

  /****************Email Queue****************/
  EMAIL_SUCCESS: 1,
  EMAIL_FAILED: 2,
  EMAIL_PENDING: 3,

  /*****************Login Activity*************/
  LOGIN: 1,
  LOGIN_FAIL: 2,

  /******************Status*******************/
  ACTIVE: 1,
  INACTIVE: 2,
  DELETE: 3,
  REQUEST: 5,
  BLOCK: 4,

  /*********************Cms Type***************/
  CMS_ABOUT: 1,
  CMS_TERMS: 2,
  CMS_PRIVACY: 3,

  REQUESTED: 1,
  ACCEPTED: 2,
  REJECTED: 3,
  AUTO_REJECTED: 4,
  CANCELED: 5,

  MALE: 0,
  FEMALE: 1,
  UNISEX: 2,
});
