import email from "../assets/email.png";
import password from "../assets/password.png";
import arrow from "../assets/arrow.png";
import person from "../assets/person.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../utils/registerSchema";
import { registerUser } from "../utils/api.js";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        navigate("/verify-otp", { state: { email: data.email } });
      }
    } catch (err) {
      setErrorMsg(err?.Message || "Error tidak diketahui");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-6 justify-center"
      >
        <div>
          <h3 className="text-center text-4xl text-primary font-extrabold text-button font-manrope">
            CukuPin
          </h3>
          <p className="text-center font-inter font-semibold text-xs">
            Cukupin Uangmu, Tenangin Harimu!
          </p>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center -mt-3">{errorMsg}</p>
        )}

        <div className="relative">
          <label className="font-inter font-medium text-[14px]">
            Nama Lengkap
          </label>
          <img
            src={person}
            alt="person-logo"
            className="absolute left-0 top-10 pl-2"
          />
          <input
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            disabled={isLoading}
            className=" w-full bg-[#EFF4FF] h-11.75 rounded-sm pl-10 text-[14px]"
            {...register("nama")}
          />
          {errors.nama && (
            <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="font-inter font-medium text-[14px]">
            Alamat Email
          </label>
          <img
            className="absolute left-0 top-10 pl-2"
            src={email}
            alt="email-logo"
          />
          <input
            type="email"
            placeholder="contoh@gmail.com"
            disabled={isLoading}
            className="bg-[#EFF4FF] w-full h-11.75 rounded-sm pl-10 text-[14px]"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="font-inter font-medium text-[14px]">
            Kata Sandi
          </label>
          <div className="relative">
            <img
              src={password}
              alt="password-logo"
              className="absolute left-0 top-3 pl-2"
            />
            <input
              type="password"
              placeholder="Minimal 8 karakter"
              disabled={isLoading}
              className="bg-[#EFF4FF] w-full h-11.75 rounded-sm pl-10 text-[14px]"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-white w-full h-11.75 rounded-sm flex items-center justify-center gap-2 disabled:opacity-70"
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
              Daftar
              <img src={arrow} alt="arrow" />
            </>
          )}
        </button>

        <p className="text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Masuk
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
