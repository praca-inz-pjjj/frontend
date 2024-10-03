import {useEffect} from "react"
import axios from "axios";
import {BACKEND_ADDRESS} from "../constances";
import {useNavigate} from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Navigation } from "../components/Navigation";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
          await axios.post(`${BACKEND_ADDRESS}/logout`, {
              refresh_token: localStorage.getItem('refresh_token'),
          }, {
              headers: { 'Content-Type': 'application/json' }
          });

          console.log('Logout successful');

          localStorage.clear();
          delete axios.defaults.headers.common['Authorization'];

          navigate('/login');
      } catch (error) {
          console.error('Logout failed', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
          <div className="bg-white p-8 shadow-md rounded-lg mt-[-100px]">
              <LoadingSpinner />
              <h1 className="text-3xl font-bold text-gray-800 mt-5">Logging out...</h1>
          </div>
        </div>
    </div>
  );
};