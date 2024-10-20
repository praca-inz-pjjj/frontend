import axios from "axios";
import { BACKEND_ADDRESS } from "../constances";
let refresh = false;
axios.defaults.baseURL = BACKEND_ADDRESS;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem("refresh_token"));
      const response = await axios.post(
        BACKEND_ADDRESS + "/refresh/",
        {
          refresh: localStorage.getItem("refresh_token"),
        },
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["access"]}`;
        console.log(response.data);

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return axios(error.config);
      } else {
        console.log("Refresh token expired");
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        if (
          ["/parent/login", "/teacher/login"].includes(window.location.pathname)
        )
          window.location.href = "/login";
      }
    }
    refresh = false;
    return error;
  }
);
