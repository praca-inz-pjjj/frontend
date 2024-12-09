import React, { useEffect, useState } from "react";
import { Navigation } from "../../../components/Navigation";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { PickUpsTable } from "../tables/PickUpsTable";
import axios from "axios";
import { useSearchParams, useParams, Link } from "react-router-dom";
import Body from "../../../components/Body";
import WideBox from "../../../components/WideBox";
import { toast } from "react-toastify";

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
    <Body>
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-6"> 
          <WideBox>
            {isLoading ? <LoadingSpinner size={48}/> : (
            <>
            <h2 className="text-gray-600 text-lg mb-12">
              <Link to='/parent'>Panel Rodzica</Link>{` > `}
              <Link className="text-black" to={`/parent/receiver/${id}?child=${childId}`}>Historia Odbiorów</Link>
            </h2>
            <PickUpsTable
              title={"Ostatnie odbiory"}
              pick_ups_data={historyData}
              no_data_message={"Brak zarejestrowanych odbiorów."}
            />
            </>
          )}
        </WideBox>
      </div>
    </Body>
  );
}
