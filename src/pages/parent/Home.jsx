import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ChildrenTable } from "./tables/ChildrenTable";
import { PickUpsTable } from "./tables/PickUpsTable";
import Body from "../../components/Body";
import InfoCard from "../../components/InfoCard";
import InfoCardContainer from "../../components/InfoCardContainer";
import NewUserIcon from "../../icons/NewUserIcon";
import AddClassIcon from "../../icons/AddClassIcon";
import HistoryIcon from "../../icons/HistoryIcon";
import WideBox from "../../components/WideBox";

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
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, []); // eslint-disable-line
  return (
    <Body>
      <Navigation />
      {isLoading ? (
        <LoadingSpinner marginTop={10} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-6">
          <WideBox>
            <h2 className="text-gray-600 text-lg mb-4">
              <Link to='/parent'>Panel Rodzica</Link>
            </h2>
            <h3 className="text-gray-800 text-2xl mb-12">{parent_name ? `Witaj, ${getFirstName()}!` : ""}</h3>
            <div className="space-y-12">
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
            <InfoCardContainer title="Zarządzanie ogólne">
              <InfoCard
                title="Historia Odbiorów"
                description="Przeglądaj historię odbiorów swoich dzieci."
                color="blue"
                onClick={() => {}}
                icon={<HistoryIcon/>}
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
            </InfoCardContainer>
            </div>
          </WideBox>
        </div>
      )}
    </Body>
  );
};
