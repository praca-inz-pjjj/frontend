import { useEffect, useState } from "react";
import { Navigation } from "../../../components/Navigation";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PickUpsTable } from "../tables/PickUpsTable";
import axios from "axios";
import { useSearchParams, useParams } from "react-router-dom";

export function Receiver() {
  const [isLoading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const childId = searchParams.get("child");
  let { id } = useParams();
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
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId, id]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-6">
        {isLoading && <LoadingSpinner marginTop={10} />}
        {isLoading || (
          <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-7xl">
            <PickUpsTable
              title={"Ostatnie odbiory"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
          </div>
        )}
      </div>
    </div>
  );
}
