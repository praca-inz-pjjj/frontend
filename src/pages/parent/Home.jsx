import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { authState } from "../../recoil-state/auth";
import { useRecoilValue } from "recoil";

export const Home = () => {
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [children, setChildren] = useState('');
  const auth = useRecoilValue(authState)

  useEffect(() => {
    if (auth.userType !== 'parent') {
      navigate('/parent/login');
      return;
    }

    const fetchParentData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`/parent`);

        setName(data.name);
        setChildren(data.children);
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login');
      } finally {
        setLoading(false)
      }
    };

    fetchParentData();
  }, [navigate, auth.userType]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {isLoading ? <LoadingSpinner marginTop={10} /> :
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Witaj, {name}!</h3>
            <p className="text-lg mb-4">Twoje dzieci:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {Object.entries(children).map(([id, child]) => (
                <li key={id} className="flex justify-between items-center">
                  <span>{id}. {child.name} {child.surname}</span>
                  <Link to={`/parent/child/${child.id}`} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Szczegóły
                  </Link>
                </li>
              ))}
            </ul>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">
              Placeholder
            </button>
            <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Placeholder
            </button>
          </div>
        </div>
      }
    </div>
  );
}