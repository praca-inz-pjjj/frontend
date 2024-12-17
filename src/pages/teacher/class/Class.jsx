import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ChildrenTable } from "./ChildrenTable";
import InfoCardContainer from "../../../components/InfoCard/InfoCardContainer";
import InfoCard from "../../../components/InfoCard/InfoCard";
import NewUserIcon from "../../../icons/NewUserIcon";
import ImportIcon from "../../../icons/ImportIcon";
import DownloadIcon from "../../../icons/DownloadIcon";
import WideBox from "../../../components/layout/WideBox";
import DetailsCard from "../../../components/DetailsCard";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import Layout from "../../../components/layout/Layout";
import { toast } from "react-toastify";
import ClassImportModal from "./ClassImport";

export const Class = () => {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const breadcrumbs = [
    { label: "Klasy", link: "/teacher" },
    { label: classData?.class_name, isActive: true }
  ];

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

  const onClassImport = () => {
    setImportModalOpen(false);
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
      toast.error("Błąd podczas pobierania pliku.");
    }
  };

  return (
    <Layout>
      <WideBox>
        {isLoading ? <LoadingSpinner size={48} /> : (
          <>
            <Breadcrumbs breadcrumbs={breadcrumbs} backTo="/teacher" />
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

            <InfoCardContainer>
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
                onClick={()=>{setImportModalOpen(true)}}
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
            <ClassImportModal isOpen={isImportModalOpen} onClose={()=>{setImportModalOpen(false)}} onImport={onClassImport} />
          </>
        )}
      </WideBox>
    </Layout>
  );
};
