import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userType = localStorage.getItem("userType");
    if (accessToken && userType === "teacher") {
      navigate("/teacher");
      return;
    }
    if (accessToken && userType === "parent") {
      navigate("/parent");
    }
  }, []); // eslint-disable-line

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
        <div className="bg-white p-8 shadow-md rounded-lg mt-[-100px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Logowanie</h1>
          <div className="flex space-x-4">
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
