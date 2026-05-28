import email from "../assets/email.png";
import arrowleft from "../assets/arrowleft.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../utils/api";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await forgotPassword(emailInput);
      if (res.statusCode === 200) {
        navigate("/codeotp", { state: { email: emailInput } });
      }
    } catch (err) {
      setErrorMsg(err?.message || "Gagal mengirim email, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-[#F8F9FF]">
      <div className="flex flex-col justify-center w-104.5 p-8 gap-9">
        <div className="text-center">
          <h2 className="text-[30px] font-extrabold text-primary font-manrope">
            Lupa Kata Sandi?
          </h2>
          <p className="font-inter text-[16px] font-normal">
            Masukkan email Anda untuk menerima instruksi pemulihan kata sandi.
          </p>
        </div>
        <form className="bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="text-[14px] font-inter font-semibold"
          >
            Alamat Email
          </label>
          <div className="flex flex-col gap-6 mt-2">
            <div className="bg-[#F8F9FF] rounded-sm flex h-11.75 items-center relative">
              <img
                src={email}
                alt="Email Icon"
                className="absolute top-4 left-4 w-4.5 h-5.5"
              />
              <input
                className="pl-12 w-full h-full"
                type="email"
                id="email"
                placeholder="contoh@gmail.com"
                disabled={isLoading}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

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
              className="bg-primary hover:cursor-pointer w-full flex items-center justify-center px-4 text-white font-inter font-semibold text-[16px] h-11.75 rounded-sm gap-2 disabled:opacity-70"
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
                  Mengirim...
                </>
              ) : (
                "Kirim Tautan"
              )}
            </button>
          </div>
          <Link
            to="/login"
            className="flex hover:underline items-center justify-center gap-2 text-[14px] font-inter font-semibold text-button mt-12"
          >
            <img src={arrowleft} alt="Arrow Icon" />
            Kembali ke Halaman Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
