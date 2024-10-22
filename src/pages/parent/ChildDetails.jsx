import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil-state/auth";

export const ChildDetails = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [childData, setChildData] = useState(null);
    const auth = useRecoilValue(authState);

    useEffect(() => {
        setLoading(true);

        if (auth.userType !== "parent") {
            navigate("/parent/login");
            return;
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/parent/child/${id}`);
                setChildData(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate, auth.userType]);

    const handleAddPermision = () => {
        // Logika do dodania nowej permisji
        // Formularz można zrobić za pomocą Formik -> Patrz Login.jsx
        navigate(`/parent/child/${id}/create-permission`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <div className="flex flex-col items-center justify-center mt-10">
                {isLoading ? (
                    <LoadingSpinner marginTop={10} />
                ) : (
                    childData && (
                        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                            <h2 className="text-2xl font-semibold mb-4">
                                Dziecko: {childData.name}
                            </h2>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Lista uprawnionych użytkowników:</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    {Object.entries(childData.permitted_users).map(([id, permitted_user]) => (
                                        <li key={id} className="flex justify-between items-center">
                                            <span>
                                                {id}. Osoba upoważniona: {permitted_user.user}. Rodzic: {permitted_user.parent}. Data: {permitted_user.date}.
                                                <span className={permitted_user.signature ? "text-green-500" : "text-red-500"}>&nbsp; {permitted_user.signature ? "Dostarczony podpis" : "Niedostarczony podpis"}</span>
                                            </span>
                                            {console.log(permitted_user.signature)}
                                            {permitted_user.is_parent === false &&
                                                <Link
                                                    to={``}
                                                    className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Usuń (TODO)
                                                </Link>
                                            }
                                        </li>
                                    ))}
                                </ul>
                                <h3 className="text-xl font-semibold mb-2">Lista uprawnień:</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    {Object.entries(childData.permissions).map(([id, permission]) => (
                                        <li key={id} className="flex justify-between items-center">
                                            <span>
                                                {id}. Osoba upoważniona: {permission.user}. Start: {permission.start_date}. Koniec: {permission.end_date}.
                                            </span>
                                            {console.log(permission.state)}
                                            {permission.state !== "PERMAMENT" &&
                                                <Link
                                                    to={``}
                                                    className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Usuń (TODO)
                                                </Link>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6 space-y-4">
                                <button
                                    onClick={handleAddPermision}
                                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Dodaj permisję
                                </button>
                                <button
                                    className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Placeholder
                                </button>
                                <button
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Historia po przycisku czy od razu w tym widoku?
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};


// const handleCreateClass = () => {
//     // Logika do tworzenia nowej klasy
//     // Można przekierować użytkownika do formularza tworzenia nowej klasy
//     navigate('/teacher/create-class');
//   };

//   const handleCreateParent = () => {
//     // Logika do tworzenia nowego rodzica
//     navigate('/teacher/create-parent');
//   };
