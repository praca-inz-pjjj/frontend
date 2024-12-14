import React from "react";
import Body from "../../components/Body";
import WideBox from "../../components/layout/WideBox";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { PickUpsTable } from "./tables/PickUpsTable";

const ParentHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []); // eslint-disable-line
  return (
    <Body>
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-6">
        <WideBox>
          {loading ? (
            <LoadingSpinner size={48} />
          ) : (
            <PickUpsTable
              title={"Ostatnie odbiory"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
          )}
        </WideBox>
      </div>
    </Body>
  );
};

export default ParentHistory;
