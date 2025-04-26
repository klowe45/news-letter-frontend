import { Navigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const ProtectedRoute = ({
  children,
  isLoggedIn,
  setActiveModal,
  setIsAuth,
}) => {
  if (setIsAuth) {
    return <Navigation />;
  }
  if (!isLoggedIn) {
    setActiveModal("signin");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
