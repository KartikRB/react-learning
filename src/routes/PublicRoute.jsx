import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/Auth";

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" /> : children;
};

export default PublicRoute;