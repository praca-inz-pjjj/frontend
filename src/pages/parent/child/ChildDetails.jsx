import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ChildPermittedUsersTable } from "./ChildPermittedUsersTable";

export const ChildDetails = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [childData, setChildData] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`/parent/child/${id}`);
                if (response?.data) {
                    const { data } = response;
                    setChildData(data);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // eslint-disable-line

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
                        <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-7xl">
                            <h2 className="text-2xl font-semibold mb-4">
                                <Link to='/parent'>Dzieci</Link>{` > `}<Link to={`/parent/child/${childData.child_id}`}>{childData.child_name}</Link>
                            </h2>
                            <div>
                                {childData?.permitted_users && <ChildPermittedUsersTable title={"Zdefiniowani Odbierający"} permitted_users_data={childData?.permitted_users}/> }

                                <h3 className="text-xl font-semibold mb-2">Lista uprawnień:</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    {Object.entries(childData.permissions).map(([id, permission]) => (
                                        <li key={id} className="flex justify-between items-center">
                                            <span>
                                                {Number(id)+1}. Osoba upoważniona: {permission.user_name}. Start: {permission.start_date}. Koniec: {permission.end_date}.
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