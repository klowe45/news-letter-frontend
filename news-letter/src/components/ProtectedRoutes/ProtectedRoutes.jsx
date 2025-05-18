import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, isAuthChecked }) => {
  if (!isAuthChecked) return null;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
