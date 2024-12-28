import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { ParentsTable } from './ParentsTable';
import WideBox from '../../../../components/layout/WideBox';
import DetailsCard from '../../../../components/DetailsCard';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../../../components/breadcrumbs/Breadcrumbs';
import Layout from '../../../../components/layout/Layout';
import InfoCardContainer from 'components/InfoCard/InfoCardContainer';
import InfoCard from 'components/InfoCard/InfoCard';
import AssignParentModal from './AssignParentModal';
import LinkUserIcon from 'icons/LinkUserIcon';
import ConfirmIcon from 'icons/ConfirmIcon';
import ConfirmAuthLetterDeliveryModal from './ConfirmAuthLetterDeliveryModal';

const compareByLastNameAndFirstName = (a, b) => {
  if (a.last_name === b.last_name) {
    return a.first_name.localeCompare(b.first_name);
  }
  return a.last_name.localeCompare(b.last_name);
};

const sortAlphabetically = (people) => people.sort(compareByLastNameAndFirstName);

export const Child = () => {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [childParents, setChildParents] = useState(null);
  const [allParents, setRemainingParents] = useState(null);
  const [receivers, setReceivers] = useState(null);
  const [isAssignParentModalOpen, setIsAssignParentModalOpen] = useState(false);
  const [isConfirmDeliveryModalOpen, setIsConfirmDeliveryModalOpen] = useState(false);
  const [child, setChild] = useState(null);
  const [classroom, setClassroom] = useState(null);
  const getChildName = () => `${child?.first_name} ${child?.last_name}`;
  const breadcrumbs = [
    { label: "Klasy", link: "/teacher" },
    { label: classroom?.name, link: `/teacher/class/${classroom?.id}` },
    { label: getChildName(), isActive: true },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/teacher/child/${id}`);
      if (response?.data) {
        setChildParents(sortAlphabetically(response.data.parents));
        setRemainingParents(sortAlphabetically(response.data.all_parents.filter(({ id }) => !response.data.parents.some((parent) => parent.id === id))));
        setChild(response.data.child);
        setClassroom(response.data.classroom);
        setReceivers(response.data.receivers);
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Błąd połączenia z serwerem.');
        return;
      }
      if (error.response.status === 500) {
        toast.error('Nie udało się pobrać danych.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // eslint-disable-line

  const handleAddParent = useCallback(async (parentId) => {
    try {
      await axios.post(`/teacher/child/${id}`, { id: parentId });
      toast.success('Rodzic został przypisany.');
      fetchData();
    } catch (error) {
      toast.error('Nie udało się przypisać rodzica.');
    }
  }, [id]); // eslint-disable-line

  const handleConfirmDelivery = useCallback(async (receiverId) => {
    try {
      await axios.patch(`/teacher/child/${id}/receiver/${receiverId}/signature-delivery`, { value: true });
      toast.success('Potwierdzono dostarczenie upoważnienia.');
      fetchData();
    } catch (error) {
      toast.error('Nie udało się potwierdzić dostarczenia upoważnienia.');
    }
  }, [id]); // eslint-disable-line

  const handleDeleteParent = useCallback((parent_id) => async () => {
    try {
      await axios.delete(`/teacher/child/${id}`, {
        data: { id: parent_id }
      });
      toast.success('Usunięto przypisanie rodzica.');
      fetchData();
    } catch (error) {
      toast.error('Nie udało się usunąć rodzica.');
    }
  }, [id]); // eslint-disable-line

  return (
    <Layout>
      <WideBox>
        {isLoading ? <LoadingSpinner size={48} /> : (
          <>
            <Breadcrumbs breadcrumbs={breadcrumbs} backTo={classroom ? `/teacher/class/${classroom.id}` : ""} />

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
                parents={childParents}
                handleRemoveParent={handleDeleteParent}
              />
            </DetailsCard>

            <InfoCardContainer>
              <InfoCard
                title="Przypisz Rodzica"
                description="Przypisz rodzica do dziecka."
                icon={<LinkUserIcon />}
                color="green"
                onClick={() => setIsAssignParentModalOpen(true)}
              />
              <InfoCard
                title="Potwierdź dostarczenie zgody"
                description="Potwierdź dostarczenie pisemnego upoważnienia do odbioru dziecka."
                icon={<ConfirmIcon />}
                color="blue"
                onClick={() => setIsConfirmDeliveryModalOpen(true)}
              />
            </InfoCardContainer>

            <AssignParentModal
              isOpen={isAssignParentModalOpen}
              handleAddParent={handleAddParent}
              allParents={allParents}
              closeModal={() => {setIsAssignParentModalOpen(false)}}
            />

            <ConfirmAuthLetterDeliveryModal
              isOpen={isConfirmDeliveryModalOpen}
              handleLetterDelivery={handleConfirmDelivery}
              reveivers={receivers}
              closeModal={() => {setIsConfirmDeliveryModalOpen(false)}}
            />
          </>
        )}
      </WideBox>
    </Layout>
  );
};
