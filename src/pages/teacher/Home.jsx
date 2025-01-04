import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ClassroomsTable } from "./ClassroomsTable";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoCardContainer from "../../components/InfoCard/InfoCardContainer";
import NewUserIcon from "../../icons/NewUserIcon";
import ChangePasswordIcon from "../../icons/ChangePasswordIcon";
import AddClassIcon from "../../icons/AddClassIcon";
import Layout from "../../components/layout/Layout";
import WideBox from "../../components/layout/WideBox";

export const Home = () => {
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState('');
  const [classes, setClasses] = useState(null);
  const getFirstName = () => name?.split(" ")[0];

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`/teacher`);

        setName(data.name);
        setClasses(data.classes);
      } catch (error) {
        return;
      } finally {
        setLoading(false)
      }
    };

    fetchTeacherData();
  }, []); // eslint-disable-line

  return (
    <Layout>
        <WideBox>
          {isLoading ? <LoadingSpinner size={48} /> : (
            <>
              <h3 className="text-gray-800 text-2xl mb-12">{name ? `Witaj, ${getFirstName()}!` : ""}</h3>
              <div className="mb-8">
                <ClassroomsTable
                  title={"Klasy"}
                  no_data_message={"Nie znaleziono żadnych klas."}
                  classrooms={classes}
                />
              </div>
              <InfoCardContainer>
                <InfoCard
                  title="Nowa Klasa"
                  description="Utwórz nową klasę."
                  color="blue"
                  href="/teacher/create-class"
                  icon={<AddClassIcon />}
                />
                <InfoCard
                  title="Nowy Rodzic"
                  description="Utwórz nowe konto rodzica."
                  color="green"
                  href="/teacher/create-parent"
                  icon={<NewUserIcon />}
                />
                <InfoCard
                  title="Zmiana hasła"
                  description="Zmień istniejące hasło na nowe."
                  color="red"
                  href="/change-password"
                  icon={<ChangePasswordIcon />}
                />
              </InfoCardContainer>
            </>
          )}
        </WideBox>
      </Layout>
  );
}