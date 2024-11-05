import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Navigation } from "../../../components/Navigation";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PermittedReceiversTable } from "./PermittedReceiversTable";
import { NotPermitedReceiversTable } from "./NotPermittedReceiversTable";
import GreenLinkButton from "../../../components/buttons/GreenLinkButton";
import OrangeLinkButton from "../../../components/buttons/OrangeLinkButton";
import ErrorNotification from "../../../components/ErrorNotification";
import BlueLinkButton from "../../../components/buttons/BlueLinkButton";

export const Receivers = () => {
    const [isLoading, setLoading] = useState(false);
    const [permitted_receivers, setPermittedReceivers] = useState(null);
    const [not_permitted_receivers, setNotPermittedReceivers] = useState(null);
    const [error, setError] = useState(null);

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
            setError("Błąd podczas ładowania odbiorców.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSignatureSubmit = useCallback((receiver_id, child_id) => async () => {
        try {
            setError(null);
            await axios.post(`/parent/receiver/${receiver_id}/signature`, { child_id });
            fetchData();
        } catch (error) {
            setError(error?.response?.data?.message || "Błąd podczas dostarczania zgody.");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <div className="flex flex-col items-center justify-center mt-6">
                {isLoading && <LoadingSpinner marginTop={10} />}
                {isLoading || (
                <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-7xl">
                    <h2 className="text-2xl font-semibold mb-12">
                        <Link to='/parent'>Panel Rodzica</Link>
                        {' > '}
                        <Link to={'/parent/receivers'}>Odbierający</Link>
                    </h2>
                    {permitted_receivers && (
                    <PermittedReceiversTable
                        title={"Uprawnieni Odbierający"}
                        receivers_data={permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego uprawnionego Odbierającego."}
                        buttons={[
                            <BlueLinkButton to={"/parent/history"} text={"Historia odbiorów"} />
                        ]}
                    />
                    )}
                    {not_permitted_receivers && (
                    <NotPermitedReceiversTable
                        title={"Nieuprawnieni Odbierający"}
                        receivers_data={not_permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego nieuprawnionego Odbierającego."}
                        buttons={[
                            <GreenLinkButton to={"/parent/create-receiver"} text={"Nowy Odbierający"} />
                        ]}
                        handleSignatureSubmit={handleSignatureSubmit}
                    />
                    )}
                </div>
                )}
                {error && <ErrorNotification message={error} />}
            </div>
        </div>
    );
};
