import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, setSelectedPopup, children }) {
  if (!isLoggedIn) {
    setSelectedPopup("login-popup");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
