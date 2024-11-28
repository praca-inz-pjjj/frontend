import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Navigation } from "../../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ChildPermittedUsersTable } from "./ChildPermittedUsersTable";
import { PermissionsTable } from "./PermissionsTable";
import ColorfulButton from "../../../components/buttons/ColorfulButton";
import Body from "../../../components/Body";
import WideBox from "../../../components/WideBox";
import { toast } from "react-toastify";

export const ChildDetails = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [childData, setChildData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/parent/child/${id}`);
            if (response?.data) {
                const { data } = response;
                setChildData(data);
            }
        } catch (error) {
            if (!error.response) {
                toast.error("Błąd połączenia z serwerem.");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]); // eslint-disable-line

    const handleAddPermision = () => {
        navigate(`/parent/child/${id}/create-permission`);
    };

    const handleDeletePermission = useCallback((perm_id) => async () => {
        try {
            await axios.delete(`/parent/permission/${perm_id}`);
            toast.success("Usunięto pomyślnie zgodę.");
            fetchData();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Błąd podczas usuwania zgody.");
        }
    }, []);  // eslint-disable-line

    return (
        <Body>
            <Navigation />
            <div className="flex flex-col items-center justify-center mt-6">
                {isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <WideBox>
                        {childData && (
                        <>
                        <h2 className="text-gray-600 text-lg mb-12">
                                <Link to='/parent'>Panel Rodzica</Link>{` > `}
                                <span>Dzieci</span>{` > `}
                                <Link className="text-black font-semibold text-xl" to={`/parent/child/${childData.child_id}`}>{childData.child_name}</Link>
                        </h2>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex justify-end">
                                    <ColorfulButton color="green" text="Wydaj zgodę" onClick={handleAddPermision} />
                                </div>
                                <PermissionsTable
                                    title={"Wydane zgody"}
                                    permssions={childData?.permissions || []}
                                    no_data_message={"Nie znaleziono żadnych zgód."}
                                    handleDeletePermission={handleDeletePermission}
                                />
                            </div>
                                {childData?.permitted_users &&
                            <ChildPermittedUsersTable
                                title={"Upoważnione osoby"}
                                permitted_users_data={childData?.permitted_users}
                                no_data_message={"Nie znaleziono żadnych upoważnionych osób."}
                                child_id={childData.child_id}
                            />}
                        </div>
                        </>
                        )}
                    </WideBox>
                )}
            </div>
        </Body>
    );
};