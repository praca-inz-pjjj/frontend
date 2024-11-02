import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { authState } from "../../recoil-state/auth";
import { useRecoilValue } from "recoil";
import { ChildrenTable } from "./tables/ChildrenTable";
import { ReceiversTable } from "./tables/ReceiversTable";
import { PickUpsTable } from "./tables/PickUpsTable";
import GreenLinkButton from "../../components/buttons/GreenLinkButton";

export const Home = () => {
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [parent_name, setParentName] = useState('');
  const [children, setChildren] = useState([]);
  const [receivers_data, setReceiversData] = useState([]);
  const auth = useRecoilValue(authState)

  useEffect(() => {
    if (auth.userType !== 'parent') {
      navigate('/login');
      return;
    }

    const fetchParentData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/parent`);
        if (response.status === 200) {
          const { data } = response;
          setParentName(data.parent_name);
          setChildren(data.children);
          setReceiversData(data.receivers)
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/parent/login');
      } finally {
        setLoading(false)
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
            <h3 className="text-2xl mb-12">Witaj, {parent_name}!</h3>
            {children && (
              <ChildrenTable 
                title={"Twoje dzieci"}
                children_data={children}
                no_data_message={"Nie znaleziono żadnych dzieci."} />
                )}
            {receivers_data && (
              <ReceiversTable
                title={<Link to="/parent/receivers">Odbierający</Link>}
                receivers_data={receivers_data}
                no_data_message={"Nie znaleziono żadnego Odbierającego."}
              />
              )}
            {children && (
            <PickUpsTable 
              title={"Ostatnie odbiory"}
              pick_ups_data={[]}
              no_data_message={"Brak zarejestrowanych odbiorów."} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}