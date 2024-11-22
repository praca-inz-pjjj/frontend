import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Navigation } from "../../../components/Navigation";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PermittedReceiversTable } from "./PermittedReceiversTable";
import { NotPermitedReceiversTable } from "./NotPermittedReceiversTable";
import ErrorNotification from "../../../components/ErrorNotification";
import Body from "../../../components/Body";
import WideBox from "../../../components/WideBox";

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
            setError("Błąd podczas pobierania upoważnień.");
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
        <Body>
            <Navigation />
            <div className="flex flex-col items-center justify-center mt-6">
                {isLoading && <LoadingSpinner marginTop={10} />}
                {isLoading || (
                <WideBox className="space-y-16">
                    <h2 className="text-gray-600 text-lg mb-12">
                        <Link to='/parent'>Panel Rodzica</Link>
                        {' > '}
                        <Link className="text-black font-semibold text-xl" to={'/parent/receivers'}>Upoważnienia</Link>
                    </h2>
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
                </WideBox>
                )}
                {error && <ErrorNotification message={error} />}
            </div>
        </Body>
    );
};
