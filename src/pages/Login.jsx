import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil-state/auth";

export const Login = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    switch (userType) {
      case "teacher":
        setAuth((s) => ({ ...s, userType: "teacher" }));
        navigate("/teacher");
        break;
      case "parent":
        setAuth((s) => ({ ...s, userType: "parent" }));
        navigate("/parent");
        break;
      default:
        break;
    }
  }, [navigate, setAuth]);
  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
        <div className="bg-white p-8 shadow-md rounded-lg mt-[-100px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Witaj w systemie <br /> do zarządzania przedszkolem
          </h1>
          <div className="flex space-x-4 items-center justify-center">
            <Link
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              to="/teacher/login"
            >
              Panel Nauczyciela
            </Link>
            <Link
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              to="/parent/login"
            >
              Panel Rodzica
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
