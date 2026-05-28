import email from "../assets/email.png";
import password from "../assets/password.png";
import arrow from "../assets/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { useState } from "react";

const Login = () => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    const payload = {
      email: emailInput,
      password: passwordInput,
    };
    try {
      const res = await loginUser(payload);
      if (res.statusCode === 200) {
        localStorage.setItem("accessToken", res.Data.AccessToken);
        localStorage.setItem("refreshToken", res.Data.RefreshToken);
        localStorage.setItem("isOnboarding", res.Data.is_onBoarding);
        if (res.Data.is_onBoarding) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan, silahkan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-6 justify-center"
      >
        <div>
          <h3 className="text-center text-4xl font-extrabold text-button font-manrope">
            CukuPin
          </h3>
          <p className="text-center font-inter font-semibold text-xs">
            Cukupin Uangmu, Tenangin Harimu!
          </p>
        </div>

        <div className="relative">
          <label htmlFor="email" className="font-inter font-medium text-[14px]">
            Alamat Email
          </label>
          <img
            className="absolute left-0 top-10 pl-2"
            src={email}
            alt="email-logo"
          />
          <input
            type="email"
            id="email"
            placeholder="contoh@gmail.com"
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#EFF4FF] w-full h-11.75 rounded-sm pl-10 font-inter font-regular text-[14px]"
          />
        </div>

        <div>
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="font-inter font-medium text-[14px]"
            >
              Kata Sandi
            </label>
            <Link
              to="/forgot-password"
              className="text-[14px] text-button hover:underline"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
          <div className="relative">
            <img
              src={password}
              alt="password-logo"
              className="absolute left-0 top-3 pl-2"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#EFF4FF] w-full h-11.75 rounded-sm pl-10 pr-10 font-inter font-regular text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-inter text-center -mt-4">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white w-full h-11.75 rounded-sm font-inter flex items-center justify-center gap-2 hover:cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Memuat...
            </>
          ) : (
            <>
              Masuk
              <img src={arrow} alt="arrow" />
            </>
          )}
        </button>

        <p className="text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-button hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
