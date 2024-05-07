
import { constant } from "./constants";

export const checkAdminState = (state) => {
  switch (state) {
    case constant.ACTIVE:
      return <span className="badge bg-success">Active</span>;
    case constant?.INACTIVE:
      return <span className="badge bg-warning">In-Active</span>;
    case constant?.DELETE:
      return <span className="badge bg-danger">Delete</span>;
    case constant?.REQUEST:
      return <span className="badge bg-info">Requested</span>;
      case constant?.BLOCK:
        return <span className="badge bg-danger">Block</span>;
    default:
      break;
  }
};
