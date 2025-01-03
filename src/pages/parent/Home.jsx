import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ChildrenTable } from "./tables/ChildrenTable";
import { PickUpsTable } from "./tables/PickUpsTable";
import InfoCard from "../../components/InfoCard/InfoCard";
import NewUserIcon from "../../icons/NewUserIcon";
import AddClassIcon from "../../icons/AddClassIcon";
import HistoryIcon from "../../icons/HistoryIcon";
import WideBox from "../../components/layout/WideBox";
import ChangePasswordIcon from "../../icons/ChangePasswordIcon";
import InfoCardContainer from "../../components/InfoCard/InfoCardContainer";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";

export const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [parent_name, setParentName] = useState("");
  const [children, setChildren] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const getFirstName = () => parent_name?.split(" ")[0];

  useEffect(() => {
    const fetchParentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/parent`);
        if (response?.data) {
          const { data } = response;
          setParentName(data.parent_name);
          setChildren(data.children);
          setHistoryData(data.history);
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

    fetchParentData();
  }, []); // eslint-disable-line

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
      <WideBox>
        <h3 className="text-gray-800 text-2xl mb-8">{parent_name ? `Witaj, ${getFirstName()}!` : ""}</h3>
        <div className="space-y-8">
          {children && (
            <ChildrenTable
              title={"Dzieci"}
              children_data={children}
              no_data_message={"Nie znaleziono żadnych dzieci."}
            />
          )}
          {children && (
            <PickUpsTable
              title={"Ostatnie odbiory"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
          )}
          <InfoCardContainer>
            <InfoCard
              title="Historia Odbiorów"
              description="Przeglądaj historię odbiorów swoich dzieci."
              color="blue"
              href="/parent/history"
              icon={<HistoryIcon />}
            />
            <InfoCard
              title="Nowy Odbierający"
              description="Utwórz nowe konto odbierającego."
              color="green"
              href="/parent/create-receiver"
              icon={<NewUserIcon />}
            />
            <InfoCard
              title="Upoważnienia"
              description="Przeglądaj i zarządzaj upoważnieniami do odbioru swoich dzieci."
              color="blue"
              href="/parent/receivers"
              icon={<AddClassIcon />}
            />
            <InfoCard
              title="Zmiana hasła"
              description="Zmień istniejące hasło na nowe."
              color="red"
              href="/change-password"
              icon={<ChangePasswordIcon />}
            />
          </InfoCardContainer>
        </div>
      </WideBox>
    </Layout>
  );
};
