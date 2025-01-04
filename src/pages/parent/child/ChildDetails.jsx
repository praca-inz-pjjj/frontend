import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ChildPermittedUsersTable } from "./ChildPermittedUsersTable";
import { PermissionsTable } from "./PermissionsTable";
import ColorfulButton from "../../../components/buttons/ColorfulButton";
import WideBox from "../../../components/layout/WideBox";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import ColorfulLinkButton from "components/buttons/ColorfulLinkButton";
import DetailsCard from "components/DetailsCard";

export const ChildDetails = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [childData, setChildData] = useState(null);
    const getChildName = () => childData?.child_name;
    const breadcrumbs = [
        { label: "Dzieci", link: "/parent" },
        { label: getChildName(), isActive: true },
    ];

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
        <Layout>
            <WideBox>
                {isLoading ? (<LoadingSpinner size={48} />) : (
                    childData && (
                        <>
                            <Breadcrumbs breadcrumbs={breadcrumbs} backTo={"/parent"} />
                            <DetailsCard
                                title="Szczegóły Dziecka"
                                headerContent={
                                    <div className="flex flex-col items-start">
                                        <p className="font-semibold text-gray-800 text-lg">{getChildName()}</p>
                                        <p className="text-gray-600">Klasa: <span className="font-semibold">{childData?.child_classroom}</span></p>
                                        <p className="text-gray-600">Nauczyciel: <span className="font-semibold">{childData?.child_teacher}</span></p>
                                    </div>
                                }
                                >
                                <PermissionsTable
                                    title={"Wydane zgody"}
                                    permssions={childData?.permissions || []}
                                    no_data_message={"Nie znaleziono żadnych wydanych zgód."}
                                    handleDeletePermission={handleDeletePermission}
                                    buttons={[
                                        <ColorfulButton color="primary_green" text="Wydaj zgodę" onClick={handleAddPermision} />
                                    ]}
                                />
                                {childData?.permitted_users &&
                                <ChildPermittedUsersTable
                                    title={"Upoważnione osoby"}
                                    permitted_users_data={childData?.permitted_users}
                                    no_data_message={"Nie znaleziono żadnych upoważnionych osób."}
                                    child_id={childData.child_id}
                                    buttons={[
                                        <ColorfulLinkButton color="primary_blue" text="Zarządzaj" to="/parent/receivers" />
                                    ]}
                                />}
                            </DetailsCard>
                        </>
                    )
                )}
            </WideBox>
        </Layout>
    );
};