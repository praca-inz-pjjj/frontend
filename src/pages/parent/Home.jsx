import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { authState } from "../../recoil-state/auth";
import { useRecoilValue } from "recoil";
import { ChildrenTable } from "./tables/ChildrenTable";
import { PermittedUsersTable } from "./tables/PermittedUsersTable";
import { PickUpsTable } from "./tables/PickUpsTable";
import ReceiveHistory from "../../components/ReceiveHistory";

export const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [children, setChildren] = useState("");
  const auth = useRecoilValue(authState);
  const [historyData, setHistoryData] = useState([]);
  const [permitted_users, setPermittedUsers] = useState([]);

  useEffect(() => {
    if (auth.userType !== "parent") {
      navigate("/parent/login");
      return;
    }

    const fetchParentData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/parent`);
        if (res.status === 200) {
          const { data } = res;
          setName(data.name);
          setChildren(data.children);
          setHistoryData(data.history);
          setPermittedUsers(data.permitted_users);
        }
        if (res.status === 401) {
          console.error("Authentication failed");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch parent data");
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [navigate, auth.userType]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {isLoading ? (
        <LoadingSpinner marginTop={10} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-7xl">
            <h3 className="text-2xl font-semibold mb-4">Witaj, {name}!</h3>
            {children && (
              <PickUpsTable
                title={"Ostatnie Odbiory"}
                pick_ups_data={[]}
                no_data_message={
                  "- Brak zarejestrowanych odbiorów lub wystąpił błąd -"
                }
              />
            )}
            {children && (
              <ChildrenTable
                title={"Twoje Dzieci"}
                children_data={children}
                no_data_message={
                  "- Twoje dzieci nie zostały jeszcze wpisane do bazy uczniów lub wystąpił błąd -"
                }
              />
            )}
            {children && (
              <PermittedUsersTable
                title={"Zdefiniowani Odbierający"}
                permitted_users_data={permitted_users}
                no_data_message={
                  "- Nie dodałeś jeszcze żadnego odbierającego lub wystąpił błąd -"
                }
              />
            )}
            <ReceiveHistory data={historyData} limit={5} />
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">
              Placeholder
            </button>
            <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Placeholder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
