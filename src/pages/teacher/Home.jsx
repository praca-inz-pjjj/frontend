import React, { useEffect, useState} from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import {Link} from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Body from "../../components/Body";
import { ClassroomsTable } from "./ClassroomsTable";
import InfoCard from "../../components/InfoCard";
import InfoCardContainer from "../../components/InfoCardContainer";
import NewUserIcon from "../../icons/NewUserIcon";
import AddClassIcon from "../../icons/AddClassIcon";

export const Home = () => {
  const [ isLoading, setLoading ] = useState(false)
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
    <Body>
        <Navigation />
        { isLoading ? <LoadingSpinner marginTop={10}/> :
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-[1200px]">
            <h2 className="text-gray-600 text-lg mb-4">
              <Link to='/teacher'>Panel Nauczyciela</Link>
            </h2>
            <h3 className="text-gray-800 text-2xl mb-12">{name ? `Witaj, ${getFirstName()}!` : ""}</h3>

            <ClassroomsTable 
              title={"Klasy"}
              no_data_message={"Nie znaleziono żadnych klas."} 
              classrooms={classes}
            />
            <InfoCardContainer title="Zarządzanie ogólne">
              <InfoCard
                  title="Nowa Klasa"
                  description="Utwórz nową klasę."
                  color="blue"
                  href="/teacher/create-class"
                  icon={<AddClassIcon/>}
              />
              <InfoCard
                  title="Nowy Rodzic"
                  description="Utwórz nowe konto rodzica."
                  color="green"
                  href="/teacher/create-parent"
                  icon={<NewUserIcon/>}
              />
            </InfoCardContainer>
          </div>
        </div>
        }
    </Body>
  );
}