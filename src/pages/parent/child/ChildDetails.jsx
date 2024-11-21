import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ChildPermittedUsersTable } from "./ChildPermittedUsersTable";
import { PermissionsTable } from "./PermissionsTable";
import ColorfulButton from "../../../components/buttons/ColorfulButton";
import Body from "../../../components/Body";

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
            } catch (error) {
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // eslint-disable-line

    const handleAddPermision = () => {
        // Logika do dodania nowej permisji
        // Formularz można zrobić za pomocą Formik -> Patrz Login.jsx
        navigate(`/parent/child/${id}/create-permission`);
    };

    return (
        <Body>
            <Navigation />
            <div className="flex flex-col items-center justify-center mt-6">
                {isLoading ? (
                    <LoadingSpinner marginTop={10} />
                ) : (
                    childData && (
                        <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-[1200px]">
                            <h2 className="text-gray-600 text-lg mb-12">
                                <Link to='/parent'>Panel Rodzica</Link>{` > `}
                                <span>Dzieci</span>{` > `}
                                <Link className="text-black font-semibold text-xl" to={`/parent/child/${childData.child_id}`}>{childData.child_name}</Link>
                            </h2>
                            <div>
                                {childData?.permissions && 
                                <PermissionsTable 
                                    title={"Wydane zgody"}
                                    permssions={childData?.permissions}
                                    no_data_message={"Nie znaleziono żadnych zgód."}
                                    buttons={[
                                        <ColorfulButton color="green" text="Wydaj zgodę" onClick={handleAddPermision} />
                                    ]}
                                /> }
                                {childData?.permitted_users && 
                                <ChildPermittedUsersTable 
                                    title={"Upoważnione osoby"}
                                    permitted_users_data={childData?.permitted_users}
                                    no_data_message={"Nie znaleziono żadnych upoważnionych osób."}
                                    child_id={childData.child_id}
                                />}
                            </div>
                        </div>
                    )
                )}
            </div>
        </Body>
    );
};