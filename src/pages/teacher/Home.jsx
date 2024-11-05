import React, { useEffect, useState} from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import {Link, useNavigate} from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Home = () => {
  const [ isLoading, setLoading ] = useState(false)
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [classes, setClasses] = useState('');
 
  useEffect(() => {
    const fetchTeacherData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/teacher`);
            
            setName(data.name);
            setClasses(data.classes);
        } catch (error) {
            return;
        } finally {
            setLoading(false)
        }
    };

    fetchTeacherData();
  }, []); // eslint-disable-line

  const handleCreateClass = () => {
  // Logika do tworzenia nowej klasy
  // Można przekierować użytkownika do formularza tworzenia nowej klasy
    navigate('/teacher/create-class');
  };

  const handleCreateParent = () => {
    // Logika do tworzenia nowego rodzica
    navigate('/teacher/create-parent');
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <Navigation />
        { isLoading ? <LoadingSpinner marginTop={10}/> :
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Witaj, {name}!</h3>
            <p className="text-lg mb-4">Twoje klasy:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {Object.entries(classes).map(([id, el]) => (
                <li key={id} className="flex justify-between items-center">
                  <span>{el}</span>
                    <Link to={`/teacher/class/${id}`} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Modyfikuj
                    </Link>
                </li>
              ))}
            </ul>
            <button onClick={handleCreateClass} className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">
              Utwórz nową klasę
            </button>
            <button onClick={handleCreateParent} className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Utwórz Rodzica
            </button>
          </div>
        </div>
        }
    </div>
  );
}