import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import CodeOtpPage from "./pages/CodeOtpPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VaultPage from "./pages/VaultPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import {
  ProtectedRoute,
  PublicRoute,
  RootRedirect,
} from "./routes/protectedRoute.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/codeotp" element={<CodeOtpPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnBoardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        }
      />
       <Route
        path="/vault"
        element={
          <ProtectedRoute>
            <VaultPage />
          </ProtectedRoute>
        }
      />
         <Route
        path="/profile"
        element={
          <ProfilePage>
            <VaultPage />
          </ProfilePage>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
