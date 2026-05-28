import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import perisai from "../assets/perisai.png";
import clock from "../assets/clock.png";
import ButtonBack from "../components/ButtonBack";
import { forgotPassword, verifyOtpResetPassword } from "../utils/api";

const CodeOtpPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const SESSION_KEY = `otpEndTime_reset_${state?.email}`;

  const [countdown, setCountdown] = useState(() => {
    const savedEndTime = sessionStorage.getItem(
      `otpEndTime_reset_${state?.email}`,
    );
    if (savedEndTime) {
      const remaining = Math.round(
        (parseInt(savedEndTime) - Date.now()) / 1000,
      );
      return remaining > 0 ? remaining : 0;
    }
    return 60;
  });

  useEffect(() => {
    if (countdown <= 0) return;
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, Date.now() + countdown * 1000);
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem(SESSION_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(SESSION_KEY);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await verifyOtpResetPassword({
        email: state.email,
        otp,
        newPassword,
      });
      if (res.statusCode === 201) {
        sessionStorage.removeItem(SESSION_KEY);
        alert(res.Mesagge);
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg(err?.message || "Kode OTP salah atau password tidak valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await forgotPassword(state.email);
      setSuccessMsg("Kode OTP telah dikirim ulang!");
      sessionStorage.removeItem(SESSION_KEY);
      setCountdown(60);
    } catch (err) {
      setErrorMsg(err?.message || "Gagal mengirim ulang OTP, coba lagi.");
    } finally {
      setIsResending(false);
    }
  };

  const formatCountdown = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-background flex flex-col justify-center items-center h-screen relative">
      <ButtonBack />
      <form
        onSubmit={handleSubmit}
        className="bg-white w-md flex-col justify-center items-center p-8 rounded-lg flex gap-7"
      >
        <img src={perisai} alt="Perisai" />
        <div>
          <h1 className="font-manrope text-[30px] font-extrabold text-center">
            Verifikasi Kode
          </h1>
          <p className="font-inter text-[14px] font-bold text-center">
            Kami telah mengirimkan kode verifikasi ke email Anda.
          </p>
          <p className="font-inter text-[14px] text-center text-button font-bold mt-1">
            {state?.email}
          </p>
        </div>

        <input
          className="w-full h-14 bg-background px-4 rounded-lg border-2 border-gray-200 font-inter text-sm focus:outline-none focus:border-button transition"
          type="text"
          placeholder="Masukan 6 digit kode"
          maxLength={6}
          disabled={isLoading}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="Masukan password baru"
          disabled={isLoading}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full h-14 bg-background px-4 rounded-lg border-2 border-gray-200 font-inter text-sm focus:outline-none focus:border-button transition"
        />

        {errorMsg && (
          <p className="text-red-500 text-sm font-inter text-center -mt-4">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="text-green-500 text-sm font-inter text-center -mt-4">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary w-full text-white font-manrope text-[16px] font-bold rounded-lg h-14 flex items-center justify-center gap-2 disabled:opacity-70"
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
              Memverifikasi...
            </>
          ) : (
            "Verifikasi"
          )}
        </button>

        <p>
          Belum menerima kode?{" "}
          {countdown > 0 ? (
            <span className="opacity-50 cursor-not-allowed">Kirim Ulang</span>
          ) : (
            <span
              className={`hover:underline cursor-pointer ${isResending ? "opacity-50 pointer-events-none" : ""}`}
              onClick={handleResendOTP}
            >
              {isResending ? "Mengirim..." : "Kirim Ulang"}
            </span>
          )}
        </p>

        <div className="flex flex-row gap-2">
          <img src={clock} alt="clock-icon" className="scale-70" />
          <p className="font-inter font-bold text-[12px]">
            {formatCountdown(countdown)}
          </p>
        </div>
      </form>
    </div>
  );
};

export default CodeOtpPage;
