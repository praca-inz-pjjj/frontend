import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigation } from "../../components/Navigation";
import { useParams} from 'react-router-dom';
import {BACKEND_ADDRESS} from '../../constances';

export const ParentsOfChild = () => {
  let {id} = useParams();
  const [parents, setParents] = useState('');
  const [allParents, setAllParents] = useState('');
  const [child, setChild] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_ADDRESS + `/teacher/child/${id}`);
        setParents(response.data.parents);
        setAllParents(response.data.all_parents);
        setChild(response.data.child);
        console.log(parents);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filteredPeople = Object.entries(allParents).filter(([id, person]) =>
    `${person.first_name} ${person.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePerson = (person) => {
    setSearchTerm(`${person.first_name} ${person.last_name}`);
    setSelectedPersonId(person.id);
    console.log(selectedPersonId)
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleAddParent = async (parentId) => {
    try {
      await axios.post(BACKEND_ADDRESS + `/teacher/child/${id}`, {
        'id': parentId
      });
    }
    catch (error) {
      alert(error.message);
    }
    window.location.reload();
  };

  const handleDeleteParent = async (parentId) => {
    try {
      await axios.delete(BACKEND_ADDRESS + `/teacher/child/${id}`, {
        data: {
          'id': parentId
        }
      });
    } catch (error) {
      alert('Error:', error);
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Profil dziecka {child.name} {child.surname}</h2>
            {parents && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Lista Rodziców:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {Object.entries(parents).map(([id, parent]) => (
                    <li key={id} className="flex justify-between items-center">
                      <span>{parseInt(id) + 1}. {parent.first_name} {parent.last_name}</span>
                      <button onClick={() => handleDeleteParent(parent.id)} className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          <div>
            <h3 className="text-xl font-semibold mb-2">Dodaj Rodzica:</h3>
            <div className="flex ">
              <div>
              <input
                type="text"
                placeholder="Szukaj osoby..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
                style={{ width: '100%', boxSizing: 'border-box'}}
                className="bg-gray-200 text-black px-3 py-1 rounded"
              />

              {isOpen && (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, border: '1px solid #ccc', position: 'revert', width: '100%' }}>
                  {filteredPeople.length > 0 ? (
                    filteredPeople.map(([id, person]) => (
                      <li
                        key={id}
                        style={{ padding: '8px', cursor: 'pointer' }}
                        onClick={() => handlePerson(person)}
                        className="bg-gray-100 text-black"
                      >{person.first_name} {person.last_name}</li>
                    ))
                  ) : (
                    <li style={{ padding: '8px', color: '#888' }} className="bg-gray-100 text-black">Brak wyników</li>
                  )}
                </ul>
              )}
              </div>
              <div>
              <button onClick={() => handleAddParent(selectedPersonId)} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Dodaj rodzica</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}