import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import Body from "../components/Body";

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
    <Body>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center mt-[300px]">
        <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-4xl">
          <div className="flex flex-row divide-x divide-gray-300">
            {/* Panel Nauczyciela */}
            <div className="flex-1 px-6 text-center">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                Panel Nauczyciela
              </h2>
              <p className="text-gray-600 mb-6">
              Twórz i przeglądaj swoje klasy oraz zarządzaj dostępem dla rodziców.
              </p>
              <Link
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 transition duration-300"
                to="/teacher/login"
              >
                Jestem Nauczycielem
              </Link>
            </div>

            {/* Panel Rodzica */}
            <div className="flex-1 px-6 text-center">
              <h2 className="text-2xl font-semibold text-green-500 mb-2">
                Panel Rodzica
              </h2>
              <p className="text-gray-600 mb-6">
                Zarządzaj uprawnieniami i opiekunami oraz
                przeglądaj historię odbiorów.
              </p>
              <Link
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition duration-300"
                to="/parent/login"
              >
                Jestem Rodzicem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
};
