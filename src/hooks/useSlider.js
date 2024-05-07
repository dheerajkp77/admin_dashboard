
import { useSelector } from "react-redux";

const useSlider = () => {
  return useSelector((state) => state?.sidebar?.isSlider);
};

export default useSlider;
