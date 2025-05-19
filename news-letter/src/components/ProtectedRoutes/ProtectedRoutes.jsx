import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, isAuthChecked }) => {
  if (!isAuthChecked) {
    return <div className="loading">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
