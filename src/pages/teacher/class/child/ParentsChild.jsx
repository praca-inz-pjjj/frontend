import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from "../../../../components/Navigation";
import { Link, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import Body from '../../../../components/Body';
import { ParentsTable } from './ParentsTable';
import ColorfulButton from '../../../../components/buttons/ColorfulButton';
import WideBox from '../../../../components/WideBox';
import DetailsCard from '../../../../components/DetailsCard';
import { toast } from 'react-toastify';

const compareByLastNameAndFirstName = (a, b) => {
  if (a.last_name === b.last_name) {
    return a.first_name.localeCompare(b.first_name);
  }
  return a.last_name.localeCompare(b.last_name);
};

const sortAlphabetically = (people) => people.sort(compareByLastNameAndFirstName);

export const ParentsOfChild = () => {
  const [isLoading, setLoading] = useState(false);
  let { id } = useParams();
  const [parents, setParents] = useState(null);
  const [allParents, setAllParents] = useState(null);
  const [child, setChild] = useState(null);
  const [classroom, setClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const getChildName = () => `${child?.first_name} ${child?.last_name}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/teacher/child/${id}`);
      if (response?.data) {
        setParents(sortAlphabetically(response.data.parents));
        setAllParents(sortAlphabetically(response.data.all_parents.filter(({ id }) => !response.data.parents.some((parent) => parent.id === id))));
        setChild(response.data.child);
        setClassroom(response.data.classroom);
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Błąd połączenia z serwerem.');
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // eslint-disable-line

  const filteredPeople = allParents?.filter(({ first_name, last_name, email }) => (
    `${first_name} ${last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePerson = (person) => {
    setSearchTerm(`${person.first_name} ${person.last_name}`);
    setSelectedPersonId(selectedPersonId === person.id ? null : person.id);  // Deselect if already selected
    setIsOpen(false);  // Close dropdown on selection
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(e.target.value !== '');  // Open dropdown when typing
    setSelectedPersonId(null);  // Reset selection when typing
  };

  const handleAddParent = async (parentId) => {
    try {
      await axios.post(`/teacher/child/${id}`, { id: parentId });
      toast.success('Rodzic został przypisany.');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Nie udało się przypisać rodzica.');
    }
  };

  const handleDeleteParent = useCallback((parent_id) => async () => {
    try {
      await axios.delete(`/teacher/child/${id}`, {
        data: { id: parent_id }
      });
      toast.success('Usunięto przypisanie rodzica.');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Nie udało się usunąć rodzica.');
    }
  }, [id]); // eslint-disable-line

  return (
    <Body>
      <Navigation />
      {isLoading ? <LoadingSpinner/> :
        <div className="flex flex-col items-center justify-center mt-6">
          <WideBox>
            <h2 className="text-gray-600 text-lg mb-12">
              <Link to='/teacher'>Panel Nauczyciela</Link>{" > "}
              <span>Klasy</span>{" > "}
              <Link to={`/teacher/class/${classroom?.id}`}>{classroom?.name}</Link>{" > "}
              <span className="text-black font-semibold text-xl">{getChildName()}</span>
            </h2>

            <DetailsCard
              title="Dane Dziecka"
              headerContent={
                <div className="flex flex-col items-start">
                  <div className="text-lg font-semibold text-gray-800 mb-2">{getChildName()}</div>
                  <div className="text-gray-600">Data urodzenia: {child?.birth_date}</div>
                  <div className="text-gray-600">Klasa: {classroom?.name}</div>
                </div>
              }
            >
              <ParentsTable
                title="Rodzice"
                no_data_message="Dziecko nie ma przypisanych rodziców."
                parents={parents}
                handleRemoveParent={handleDeleteParent}
              />
            </DetailsCard>

            <div className="overflow-x-auto mb-6 px-4 pt-3 pb-6 bg-white border border-slate-200 rounded-lg shadow-lg mt-6">
              <h3 className="text-xl mb-4">Przypisz Rodzica</h3>

              <input
                type="text"
                placeholder="Wyszukaj osobę po imieniu, nazwisku lub emailu"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={handleSearch}
              />

              {isOpen && (
                <div className="mt-2 border border-gray-300 rounded-lg max-h-[122px] overflow-y-auto shadow-md bg-white">
                  {filteredPeople.length > 0 ? (
                    filteredPeople.map((person) => (
                      <div
                        key={person.id}
                        onClick={() => handlePerson(person)}
                        className={`cursor-pointer px-4 py-2 transition-colors ${selectedPersonId === person.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        {person.first_name} {person.last_name} ({person.email})
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-center">Brak wyników</div>
                  )}
                </div>
              )}

              {selectedPersonId && (
                <div className="mt-2">
                  <ColorfulButton
                    color="green"
                    onClick={() => handleAddParent(selectedPersonId)}
                    text={"Przypisz rodzica"}
                  />
                </div>
              )}
            </div>
          </WideBox>
        </div>
      }
    </Body>
  );
};
