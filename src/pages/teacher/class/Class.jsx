import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../../components/Navigation";
import { useParams, Link } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import Body from "../../../components/Body";
import { ChildrenTable } from "./ChildrenTable";
import InfoCardContainer from "../../../components/InfoCard/InfoCardContainer";
import InfoCard from "../../../components/InfoCard/InfoCard";
import NewUserIcon from "../../../icons/NewUserIcon";
import ImportIcon from "../../../icons/ImportIcon";
import DownloadIcon from "../../../icons/DownloadIcon";
import WideBox from "../../../components/WideBox";
import DetailsCard from "../../../components/DetailsCard";

export const Class = () => {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/teacher/class/${id}`);
        setClassData(data);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // eslint-disable-line

  const handleImportClass = () => {
    // Logika do importu listy dzieci z pliku
  };

  const handleDownloadParents = async () => {
    try {
      const { data } = await axios.get(`/teacher/class/${id}/download`, {
        responseType: "blob",
      });
      const filename = classData?.class_name ? classData?.class_name : id
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = `rodzice_klasy_${filename}.csv`;
      link.click();
    }
    catch (error) {
      alert(error)
    }
  };

  return (
    <Body>
      <Navigation />
        <div className="flex flex-col items-center justify-center mt-6">
          <WideBox>
            {isLoading ? <LoadingSpinner size={48} /> : (
            <>
            <h2 className="text-gray-600 text-lg mb-12">
              <Link to='/teacher'>Panel Nauczyciela</Link>{" > "}
              <span>Klasy</span>{" > "}
              <span className="text-black font-semibold text-xl" >{classData?.class_name}</span>
            </h2>
            <DetailsCard
              title="Dane Klasy"
              headerContent={
                <div className="flex flex-col items-start">
                  <div className="text-lg font-semibold text-gray-800 mb-2">{classData?.class_name}</div>
                </div>
              }
            >
              {classData && (
              <ChildrenTable
                title="Lista dzieci"
                no_data_message="Nie dodano jeszcze żadnych dzieci do tej klasy."
                children={classData.children} />
            )}
            </DetailsCard>
            
            <InfoCardContainer title="Zarządzanie klasą">
              <InfoCard
                title="Nowe Dziecko"
                description="Dodaj nowe dziecko do klasy."
                color="green"
                href={`/teacher/class/${id}/create`}
                icon={<NewUserIcon />}
              />
              <InfoCard
                title="Importuj Listę Dzieci"
                description="Zaimportuj listę dzieci z pliku w formacie CSV."
                color="yellow"
                onClick={handleImportClass}
                icon={<ImportIcon />}
              />
              <InfoCard
                title="Pobierz Dane Rodziców"
                description="Pobierz dane logowania rodziców dzieci z tej klasy w formacie CSV."
                color="orange"
                onClick={handleDownloadParents}
                icon={<DownloadIcon />}
              />
            </InfoCardContainer>
            </>
            )}
          </WideBox>
        </div>
    </Body>
  );
};
