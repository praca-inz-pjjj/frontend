import {useEffect} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Navigation } from "../components/Navigation";
import React from "react";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
          const refresh_token = localStorage.getItem('refresh_token')
          const access_token = localStorage.getItem('access_token')
          if (access_token && refresh_token) {
            await axios.post('/logout/', {
                refresh: refresh_token,
            });
            console.log('Logout successful');
          }
      } catch (error) {
        return;
      } finally {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.clear();
        navigate("/login")
      }
    };

    logout();
  }, []); // eslint-disable-line

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
          <div className="bg-white p-8 shadow-md rounded-lg mt-[-100px]">
              <LoadingSpinner />
              <h1 className="text-3xl font-bold text-gray-800 mt-5">Wylogowywanie...</h1>
          </div>
        </div>
    </div>
  );
};