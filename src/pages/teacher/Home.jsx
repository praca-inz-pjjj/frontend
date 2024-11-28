import React, { useEffect, useState} from "react";
import axios from "axios";
import { Navigation } from "../../components/Navigation";
import {Link} from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Body from "../../components/Body";
import { ClassroomsTable } from "./ClassroomsTable";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoCardContainer from "../../components/InfoCard/InfoCardContainer";
import NewUserIcon from "../../icons/NewUserIcon";
import AddClassIcon from "../../icons/AddClassIcon";
import WideBox from "../../components/WideBox";

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
        <div className="flex flex-col items-center justify-center mt-6">
          <WideBox>
            {isLoading ? <LoadingSpinner size={48}/> : (
            <>
            <h2 className="text-gray-600 text-lg mb-4">
              <Link to='/teacher'>Panel Nauczyciela</Link>
            </h2>
            <h3 className="text-gray-800 text-2xl mb-12">{name ? `Witaj, ${getFirstName()}!` : ""}</h3>

            <div className="mb-12">
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
            </>
            )}
          </WideBox>
        </div>
    </Body>
  );
}