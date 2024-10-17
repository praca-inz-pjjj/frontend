import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    userType: localStorage.getItem("userType") || "none",
  },
});
