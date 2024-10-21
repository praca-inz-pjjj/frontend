import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigation } from "../../components/Navigation";
import { useNavigate, useParams} from 'react-router-dom';
import {BACKEND_ADDRESS} from '../../constances';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil-state/auth';

export const ParentsOfChild = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(false);
  let {id} = useParams();
  const [parents, setParents] = useState('');
  const [allParents, setAllParents] = useState('');
  const [child, setChild] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const auth = useRecoilValue(authState);

  useEffect(() => {
      if (auth.userType !== 'teacher') {
          navigate('/teacher/login');
          return;
      }
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/teacher/child/${id}`);
        setParents(response.data.parents);
        setAllParents(response.data.all_parents);
        setChild(response.data.child);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [id, navigate, auth.userType]);

  const filteredPeople = Object.entries(allParents).filter(([id, person]) =>
    `${person.first_name} ${person.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePerson = (person) => {
    setSearchTerm(`${person.first_name} ${person.last_name}`);
    setSelectedPersonId(person.id);
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
      { isLoading ? <LoadingSpinner marginTop={10}/> :
      <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Profil dziecka {child.name} {child.surname}</h2>
            {parents && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Lista Rodziców:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {Object.entries(parents).map(([id, parent], index) => (
                    <li key={parent.id} className="flex justify-between items-center">
                      <span>{index + 1}. {parent.first_name} {parent.last_name}</span>
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
      }
    </div>
  );
}