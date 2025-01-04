import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
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
import ChildrenImportModal from "./ChildrenImportModal";

export const Class = () => {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const breadcrumbs = [
    { label: "Klasy", link: "/teacher" },
    { label: classData?.class_name, isActive: true }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/teacher/class/${id}`);
      setClassData(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // eslint-disable-line

  const handleDownloadParents = async () => {
    try {
      const { data } = await axios.get(`/teacher/class/${id}/download`, {
        responseType: "blob",
      });
      const filename = classData?.class_name ? classData?.class_name : id;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = `rodzice_klasy_${filename}.csv`;
      link.click();
    }
    catch (error) {
      toast.error("Błąd podczas pobierania pliku.");
    }
  };

  const handleChildrenImport = useCallback(async (data, clearData) => {
    try {
      await axios.post(`/teacher/class/${id}/children`, data);
      toast.success("Dane zostały zaimportowane.");
      setImportModalOpen(false);
      clearData();
      fetchData();
    }
    catch (error) {
      const errorMsg = error.response?.data?.error;
      const msg = errorMsg ? errorMsg : "Wystąpił błąd podczas importowania danych.";
      toast.error(msg);
    }
  }, [id]); // eslint-disable-line

  const onImportModalClose = (clearData) => () => {
    setImportModalOpen(false);
    clearData();
  }

  return (
    <Layout>
      <WideBox>
        {isLoading ? <LoadingSpinner size={48} /> : (
          <>
            <Breadcrumbs breadcrumbs={breadcrumbs} backTo="/teacher" />
            <DetailsCard
              title="Klasa"
              headerContent={
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-gray-800 text-lg">{classData?.class_name}</p>
                  <p className="text-gray-600">Rozmiar klasy: <span className="font-semibold">{classData?.children.length}</span></p>
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
                title="Importuj listę dzieci"
                description="Zaimportuj listę dzieci z pliku w formacie CSV."
                color="yellow"
                onClick={() => { setImportModalOpen(true) }}
                icon={<ImportIcon />}
              />
              <InfoCard
                title="Pobierz dane rodziców"
                description="Pobierz dane logowania rodziców dzieci z tej klasy w formacie CSV."
                color="orange"
                onClick={handleDownloadParents}
                icon={<DownloadIcon />}
              />
            </InfoCardContainer>
            <ChildrenImportModal isOpen={isImportModalOpen} onClose={onImportModalClose} handleChildrenImport={handleChildrenImport} classroom_id={id}/>
          </>
        )}
      </WideBox>
    </Layout>
  );
};
