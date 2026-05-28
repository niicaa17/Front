import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const isOnboarding = localStorage.getItem("isOnboarding");
  if (token) {
    return isOnboarding === "true" ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/onboarding" />
    );
  }

  return children;
};
const RootRedirect = () => {
  const token = localStorage.getItem("accessToken");
  const isOnboarding = localStorage.getItem("isOnboarding");

  if (token) {
    return isOnboarding === "true" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/onboarding" replace />
    );
  }

  return <Navigate to="/login" replace />;
};

export { ProtectedRoute, PublicRoute, RootRedirect };
