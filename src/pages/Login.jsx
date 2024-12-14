import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
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
      <div className="flex flex-col items-center mt-[200px]">
        <div className="bg-white py-8 rounded-lg w-full max-w-5xl min-w-[420px] shadow-lg">
          <div className="flex flex-row divide-x divide-gray-300 relative">
            {/* Panel Nauczyciela */}
            <div className="flex-1 text-center flex flex-col items-center">
              <div className="mb-20 px-10 md:px-20">
                <h3 className="text-2xl font-semibold text-blue-500">
                  Panel
                </h3>
                <h2 className="text-4xl font-bold text-blue-500 mb-4">
                  Nauczyciela
                </h2>
                <p className="text-gray-600 text-md">
                  Twórz i przeglądaj swoje klasy oraz zarządzaj dostępem dla rodziców.
                </p>
              </div>
              <div className="absolute bottom-0">
                <ColorfulLinkButton
                  color="blue"
                  style={{ padding: "0.5rem 1.5rem"}}
                  to="/teacher/login"
                  text="Przejdź do logowania"
                />
              </div>
            </div>

            {/* Panel Rodzica */}
            <div className="flex-1 text-center flex flex-col items-center">
              <div className="mb-20 px-10 md:px-20">
                <h2 className="text-2xl font-semibold text-green-500">
                  Panel
                </h2>
                <h2 className="text-4xl font-bold text-green-500 mb-4">
                  Rodzica
                </h2>
                <p className="text-gray-600 text-md">
                  Zarządzaj uprawnieniami i opiekunami oraz przeglądaj historię odbiorów.
                </p>
              </div>
              <div className="absolute bottom-0">
                <ColorfulLinkButton
                  color="green"
                  style={{ padding: "0.5rem 1.5rem" }}
                  to="/parent/login"
                  text="Przejdź do logowania"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
};
