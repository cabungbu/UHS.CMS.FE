import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// intercept request
axiosClient.interceptors.request.use(async (config) => {
  try {
    let token;
    // const state = store.getState();
    //  token = state.auth?.access_token;
    //   if (!token) {
    //     token = Cookies.get("access_token");
    //   }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (e) {
    console.error("Axios request interceptor error:", e);
    return config;
  }
});

// intercept response
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn (401) → gọi refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("/api/auth/refresh", null, {
          withCredentials: true,
        });

        if (res.status === 200) {
          return axiosClient(originalRequest);
        }
      } catch (refreshErr) {
        console.error("Token refresh failed:", refreshErr);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
