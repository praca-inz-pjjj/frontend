import axios from "axios";
import { BACKEND_ADDRESS } from "../constances";

let isRefreshing = false;

axios.defaults.baseURL = BACKEND_ADDRESS;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't attempt to refresh if it's a login error
    if (originalRequest.url.includes("/token")) {
      return Promise.reject(error); 
    }

    if (!isRefreshing && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await axios.post('/refresh/', {
          refresh: refresh_token,
        });

        const { access: newAccessToken, refresh: newRefreshToken } = response.data;

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        return axios(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        const userType = localStorage.getItem("userType") || "none"
        delete axios.defaults.headers.common["Authorization"]
        localStorage.clear();
        console.error("Token refresh failed:", refreshError);
        if (["parent", "teacher"].includes(userType)){
          window.location.hash = `#/${userType}/login`;
          return Promise.reject(refreshError);
        }
        window.location.hash = '#/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
