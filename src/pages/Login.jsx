import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";
import Body from "../components/Body";
import ColorfulLinkButton from "../components/buttons/ColorfulLinkButton"

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
      <div className="flex flex-col items-center sm:mt-16 md:mt-32">
        <div className="bg-white p-4 sm:p-8 sm:rounded-lg w-full max-w-7xl sm:shadow-lg">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-300 relative">
            <div className="flex-1 text-center flex flex-col items-center py-4">
              <div className="mb-4 sm:mb-20 sm:px-4 lg:px-20">
                <h1 className="text-4xl font-bold text-blue-500">
                  Panel
                </h1>
                <h2 className="text-5xl font-bold text-blue-600 mb-4">
                  Nauczyciela
                </h2>
                <p className="text-gray-600 text-md text-pretty">
                  Twórz i przeglądaj swoje klasy oraz zarządzaj dostępem dla rodziców.
                </p>
              </div>
              <div className="sm:absolute bottom-4 mb-4 sm:mb-0">
                <ColorfulLinkButton
                  color="primary_blue"
                  style={{ padding: "0.75rem 2rem", fontSize: "1.2rem" }}
                  to="/teacher/login"
                  text="Zaloguj się"
                />
              </div>
            </div>

            <div className="flex-1 text-center flex flex-col items-center py-4">
              <div className="mb-4 sm:mb-20 sm:px-4 lg:px-20 mt-4 sm:mt-0">
              <h1 className="text-4xl font-bold text-green-500">
                  Panel
                </h1>
                <h2 className="text-5xl font-bold text-green-600 mb-4">
                  Rodzica
                </h2>
                <p className="text-gray-600 text-md text-pretty">
                  Zarządzaj uprawnieniami i opiekunami oraz przeglądaj historię odbiorów.
                </p>
              </div>
              <div className="sm:absolute bottom-4">
                <ColorfulLinkButton
                  color="primary_green"
                  style={{ fontSize: "1.2rem", padding: "0.75rem 2rem" }}
                  to="/parent/login"
                  text="Zaloguj się"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
};
