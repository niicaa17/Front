import axios from "axios";

const BASE_URL = "https://capstone-project-indol-three.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      }).catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("🔄 Memperbarui token...");

      const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });

      const newAccessToken = data?.payload?.Data?.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token from refresh");
      }

      localStorage.setItem("accessToken", newAccessToken);
      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError);

      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;