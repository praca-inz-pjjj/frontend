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
  const [childName, setChildName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const childId = searchParams.get("child");
  const { id } = useParams();
  const noChildBreadcrumbs = [
    { label: "Historia Odbiórów", link: "/parent/history" },
    { label: receiverName || "", isActive: true},
  ];
  const childBreadcrumbs = [
    { label: "Historia Odbiórów", link: "/parent/history" },
    { label: receiverName || "",  link: `/parent/receiver/${id}`},
    { label: childName || "", isActive: true }
  ];


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/parent/receiver/${id}${childId ? `?child=${childId}` : ""}`
        );
        if (response?.data) {
          const { data } = response;
          setHistoryData(data.history);
          setChildName(data.child.full_name);
          setReceiverName(data.receiver.full_name);
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
            <Breadcrumbs breadcrumbs={childName ? childBreadcrumbs : noChildBreadcrumbs} backTo="/parent/history" />
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
}
