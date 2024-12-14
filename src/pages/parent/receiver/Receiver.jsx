import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PickUpsTable } from "../tables/PickUpsTable";
import axios from "axios";
import { useSearchParams, useParams } from "react-router-dom";
import WideBox from "../../../components/layout/WideBox";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";

export function Receiver() {
  const [isLoading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const childId = searchParams.get("child");
  const { id } = useParams();
  const breadcrumbs = [
    { label: "Historia Odbiórów" },
    { label: "Obierający",  link: `/parent/receiver/${id}` },
    { label: "Dziecko", isActive: true },
  ];


  useEffect(() => {
    console.log(id, childId);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/parent/receiver/${id}?child=${childId}`
        );
        if (response?.data) {
          const { data } = response;
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

    fetchData();
  }, [childId, id]);

  return (
    <Layout>
      <WideBox>
        {isLoading ? <LoadingSpinner size={48} /> : (
          <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <PickUpsTable
              title={"Ostatnie odbiory"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
          </>
        )}
      </WideBox>
    </Layout>
  );
}
