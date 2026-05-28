import axios from "axios";
import api from "./axiosInstance";  
const BASE_URL = "https://capstone-project-indol-three.vercel.app";

const registerUser = async (req) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/register`, req);
    return data.payload;
  } catch (err) {
    throw err.response?.data?.payload || err.response?.data || err;
  }
};

const Verifyotp = async ({ email, otp }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/verify-otp`, { email, otp });
    return data.payload;
  } catch (err) {
    throw err.response?.data?.payload || err.response?.data || err;
  }
};

const resendOTP = async (email) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/resend-otp`, { email });
    return data.payload;
  } catch (err) {
    throw err.response?.data?.payload || err.response?.data || err;
  }
};

const loginUser = async (req) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, req);
    return data.payload;
  } catch (err) {
    throw err.response?.data?.payload || err.response?.data || err;
  }
};

const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const verifyOtpResetPassword = async ({ email, otp, newPassword }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/reset-password`, {
      email,
      otp,
      PasswordBaru: newPassword,
    });
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const onBoarding = async (req) => {
  try {
    const { data } = await api.post(`/profileFinansial/onBoarding`, req);
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const userFinancialProfile = async () => {
  try {
    const { data } = await api.get(`/profileFinansial/FinansialProfile`);
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const getCategory = async () => {
  try {
    const { data } = await api.get(`/kategori/getKategori`);
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const postCategory = async (req) => {
  try {
    const { data } = await api.post(`/kategori/buatKategori`, req);
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const postTransaksi = async (req) => {
  try {
    const { data } = await api.post(`/transaksi/createTransaksi`, req);
    console.log(data)
    return data.payload;  
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const getTransaksi = async () => {
  try {
    const { data } = await api.get(`/transaksi/getTransaksi`);
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const postCairkan = async () => {
  try {
    const { data } = await api.post(`/vault/cairkanSafetyNet`);  
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

const userLogout = async (token) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/logout`, {
      refreshToken: token,
    });
    return data.payload;
  } catch (error) {
    throw error.response?.data?.payload || error.response?.data || error;
  }
};

export {
  registerUser,
  Verifyotp,
  resendOTP,
  loginUser,
  forgotPassword,
  verifyOtpResetPassword,
  onBoarding,
  userLogout,
  userFinancialProfile,
  getCategory,
  postCategory,
  postTransaksi,
  getTransaksi,
  postCairkan,
};