import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil-state/auth";

export const Class = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    setLoading(true);

    if (auth.userType !== "teacher") {
      navigate("/teacher/login");
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/teacher/class/${id}`);
        setClassData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, auth.userType]);

  const handleAddChild = () => {
    // Logika do dodania nowego dziecka
    // Formularz można zrobić za pomocą Formik -> Patrz Login.jsx
    navigate(`/teacher/class/${id}/create`);
  };

  const handleImportClass = () => {
    // Logika do importu listy dzieci z pliku
  };

  const handleDownloadParents = async () => {
    try {
      const { data } = await axios.get(`/teacher/class/${id}/download`, {
        responseType: "blob",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = `rodzice_klasy_${id}.csv`;
      link.click();
    }
    catch (error){
      alert(error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-10">
        {isLoading ? (
          <LoadingSpinner marginTop={10} />
        ) : (
          classData && (
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
              <h2 className="text-2xl font-semibold mb-4">
                Klasa: {classData.class_name}
              </h2>
              <div>
                <h3 className="text-xl font-semibold mb-2">Lista dzieci:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {Object.entries(classData.children).map(([id, child]) => (
                    <li key={id} className="flex justify-between items-center">
                      <span>
                        {id}. {child.name} {child.surname}
                      </span>
                      <Link
                        to={`/teacher/child/${id}`}
                        className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edytuj
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 space-y-4">
                <button
                  onClick={handleAddChild}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Dodaj dziecko
                </button>
                <button
                  onClick={handleImportClass}
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Importuj listę dzieci
                </button>

                <button
                  onClick={handleDownloadParents}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Pobierz listę rodziców
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
