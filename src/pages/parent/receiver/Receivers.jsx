import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PermittedReceiversTable } from "./PermittedReceiversTable";
import { NotPermitedReceiversTable } from "./NotPermittedReceiversTable";
import WideBox from "../../../components/layout/WideBox";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import InfoCardContainer from "components/InfoCard/InfoCardContainer";
import InfoCard from "components/InfoCard/InfoCard";
import AddPermissionIcon from "icons/AddPermisionIcon";

export const Receivers = () => {
    const [isLoading, setLoading] = useState(false);
    const [permitted_receivers, setPermittedReceivers] = useState([]);
    const [not_permitted_receivers, setNotPermittedReceivers] = useState([]);
    const breadcrumbs = [
        { label: "Zarządzanie", link: "/parent" },
        { label: "Upoważnienia", isActive: true },
      ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/parent/receivers');
            if (response.status === 200) {
                const { data: receivers } = response;
                setPermittedReceivers(receivers.filter(({ signature }) => signature));
                setNotPermittedReceivers(receivers.filter(({ signature }) => !signature));
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
    }, []);

    const handleSignatureSubmit = useCallback((receiver_id, child_id) => async () => {
        try {
            await axios.post(`/parent/receiver/${receiver_id}/signature`, { child_id });
            fetchData();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Błąd podczas dostarczania zgody.");
        }
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <WideBox>
                    <LoadingSpinner size={48} />
                </WideBox>
            </Layout>
        );
    }

    return (
        <Layout>
            <WideBox className="space-y-16">
                <Breadcrumbs breadcrumbs={breadcrumbs} backTo={"/parent"} />
                {permitted_receivers && (
                    <PermittedReceiversTable
                        title={"Upoważnienia z ważną pisemną zgodą"}
                        receivers_data={permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego upoważnienia."}
                    />
                )}
                {not_permitted_receivers && (
                    <NotPermitedReceiversTable
                        title={"Upoważnienia bez ważnej pisemnej zgody"}
                        receivers_data={not_permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego upoważnienia."}
                        handleSignatureSubmit={handleSignatureSubmit}
                    />
                )}
                <InfoCardContainer>
                    <InfoCard
                    title="Dodaj Upoważnienie"
                    description="Dodaj upoważnienie do odbierania dziecka"
                    color="blue"
                    href="/parent/receivers/permission"
                    icon={<AddPermissionIcon />}
                    />
                </InfoCardContainer>
            </WideBox>
        </Layout>
    );
};
