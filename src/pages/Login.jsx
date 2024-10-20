import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil-state/auth";

export const Login = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  useEffect(() => {
    switch (auth.userType) {
      case "teacher":
        navigate("/teacher");
        break;
      case "parent":
        navigate("/parent");
        break;
      default:
        break;
    }
  });
  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
        <div className="bg-white p-8 shadow-md rounded-lg mt-[-100px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Login Page</h1>
          <div className="flex space-x-4">
            <Link
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              to="/teacher/login"
            >
              Teacher Login
            </Link>
            <Link
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              to="/parent/login"
            >
              Parent Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
