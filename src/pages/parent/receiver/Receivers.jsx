import axios, { Axios } from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../../components/Navigation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil-state/auth";
import { ReceiversTable } from "../tables/ReceiversTable";
import { NotPermitedReceiversTable } from "./NotPermittedReceiversTable";
import GreenLinkButton from "../../../components/buttons/GreenLinkButton";
import OrangeLinkButton from "../../../components/buttons/OrangeLinkButton";

export const Receivers = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const auth = useRecoilValue(authState);
    const [permitted_receivers, setPermittedReceivers] = useState(null)
    const [not_permitted_receivers, setNotPermittedReceivers] = useState(null)

    useEffect(() => {
        setLoading(true);

        if (auth.userType !== "parent") {
            navigate("/parent/login");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get('/parent/receivers');
                if (response.status === 200) {
                    const { data: receivers } = response;
                    setPermittedReceivers(receivers.filter(({signature}) => signature));
                    setNotPermittedReceivers(receivers.filter(({signature}) => !signature))
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, auth.userType]);

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
                    { permitted_receivers && (
                    <ReceiversTable
                        title={"Uprawnieni Odbierający"}
                        receivers_data={permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego uprawnionego Odbierającego."}
                        buttons={[
                            <OrangeLinkButton to={"/parent/receiver/new"} text={"Odbierz uprawnienia"}/>
                        ]}
                    />
                    )}
                    { not_permitted_receivers && (
                    <NotPermitedReceiversTable
                        title={"Nieuprawnieni Odbierający"}
                        receivers_data={not_permitted_receivers}
                        no_data_message={"Nie znaleziono żadnego nieuprawionego Odbierającego."}
                        buttons={[
                            <GreenLinkButton to={"/parent/receiver/new"} text={"Dodaj Odbierającego"}/>
                        ]}
                    />
                    )}
                </div>
            )}
            </div>
        </div>
    );
};