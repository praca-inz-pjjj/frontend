import React from "react";
import WideBox from "../../../components/layout/WideBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PickUpsTable } from "../tables/PickUpsTable";
import Layout from "components/layout/Layout";
import Breadcrumbs from "components/breadcrumbs/Breadcrumbs";

const ParentHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbs = [
    { label: "Historia Odbiórów", isActive: true },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/parent/history`);
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
    fetchHistory();
  }, []);
  return (
    <Layout>
        <WideBox>
          {loading ? (
            <LoadingSpinner size={48} />
          ) : (
            <>
            <Breadcrumbs breadcrumbs={breadcrumbs} backTo="/parent" />
            <PickUpsTable
              title={"Historia odbiorów"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
            </>
          )}
        </WideBox>
    </Layout>
  );
};

export default ParentHistory;
