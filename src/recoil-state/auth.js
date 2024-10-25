import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    accessToken: '',
    refreshToken: '',
    userType: localStorage.getItem("userType") || "none",
  },
});
