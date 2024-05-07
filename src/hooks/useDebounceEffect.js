/**
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta 
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import { useEffect, useState } from "react";

/**
 * Debounce hook will provide delay b/w request
 * @param {String} value
 * @param {Number} delay
 * @returns
 */

export const useDebounceEffect = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);
  return debouncedValue;
};