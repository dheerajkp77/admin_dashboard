
import { useSelector } from "react-redux";

const useToken = () => {
  return useSelector((state) => state?.auth?.details?.token) ?? "";
};

export default useToken;
