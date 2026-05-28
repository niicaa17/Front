import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import perisai from "../assets/perisai.png";
import clock from "../assets/clock.png";
import ButtonBack from "../components/ButtonBack";
import { resendOTP, Verifyotp } from "../utils/api";

const VerifyOtpPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const SESSION_KEY = `otpEndTime_${state?.email}`;
  useEffect(() => {
    return () => {
      sessionStorage.removeItem(SESSION_KEY);
    };
  }, []);
  const [countdown, setCountdown] = useState(() => {
    const savedEndTime = sessionStorage.getItem(`otpEndTime_${state?.email}`);
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

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await Verifyotp({ email: state.email, otp });
      if (response.statusCode === 200) {
        setSuccessMsg(response.message || "OTP berhasil diverifikasi!");
        sessionStorage.removeItem(SESSION_KEY);
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg(err?.message || "Kode OTP salah, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await resendOTP(state.email);
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
          className="h-14 bg-[#EFF4FF] text-xl text-center w-full rounded-lg border-4 border-button"
          type="text"
          placeholder="Masukan 6 digit kode"
          disabled={isLoading}
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
          className="bg-primary w-full text-white font-manrope text-[16px] font-bold rounded-lg h-14"
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi"}
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

export default VerifyOtpPage;
