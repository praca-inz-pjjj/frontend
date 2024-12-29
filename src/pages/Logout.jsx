import { useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Navigation } from "../components/navigation/Navigation";
import React from "react";
import Body from "../components/Body";
import FormContainer from "components/layout/form/FormContainer";

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
    <Body>
      <Navigation />
      <FormContainer>
          <LoadingSpinner size={48} />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mt-5">Zamykanie sesji...</h1>
          </div>
      </FormContainer>
    </Body>
  );
};