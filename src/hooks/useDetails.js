
import { useSelector } from 'react-redux'

const useDetails = () => {
  return useSelector(state => state?.auth?.details)
}

export default useDetails