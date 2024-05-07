

import { toastAlert } from "./SweetAlert";

export const phoneRegExp = /^[6-9]\d{9}$/;

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const acceptOnlyNumber = (e) => {
  const re = /[0-9A-F:]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export const acceptOnlyAlphabet = (e) => {
  const re = /[0-9A-F:]+/g;
  if (re.test(e.key)) {
    e.preventDefault();
  }
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const imageValidator = (data) => {
  const fileExtension = data.type.split("/")[1];
  const validExtensions = ["png", "jpeg", "jpg"];
  if (!validExtensions.includes(fileExtension)) {
    toastAlert("error", "Please select png, jpeg, jpg format");
    return false;
  }
  return true;
};
