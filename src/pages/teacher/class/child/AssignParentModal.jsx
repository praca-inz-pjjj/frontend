import React, { useState } from "react"
import WideModal from "components/modal/WideModal"
import ColorfulButton from "components/buttons/ColorfulButton";



const AssignParentModal = ({ isOpen, handleAddParent, allParents, closeModal }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPersonId, setSelectedPersonId] = useState(null);

    const handlePerson = (person) => {
        setSearchTerm(`${person.first_name} ${person.last_name}`);
        setSelectedPersonId(selectedPersonId === person.id ? null : person.id);
        setIsDropdownOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(e.target.value !== '');
        setSelectedPersonId(null);
    };

    const filteredPeople = allParents?.filter(({ first_name, last_name, email }) => (
        `${first_name} ${last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const onClose = () => {
        setSearchTerm('');
        setSelectedPersonId(null);
        setIsDropdownOpen(false);
        closeModal();
    }

    const onAssign = () => {
        handleAddParent(selectedPersonId);
        onClose();
    }

    return (
        <WideModal
            title="Przypisywanie rodzica"
            subtitle="Przypisana osoba uzyska uprawnienia do odbioru oraz zarządzania danym dzieckiem"
            isOpen={isOpen}
            action_buttons={
                <>
                    <ColorfulButton onClick={onClose} text={"Zamknij"} color="slate" />
                    <ColorfulButton onClick={onAssign} text={"Przypisz"} color="primary_green" disabled={!selectedPersonId} />
                </>
            }>
            <div className="overflow-visible">
                <input
                    type="text"
                    placeholder="Wyszukaj osobę po imieniu lub adresie email"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                {isDropdownOpen && (
                    <div className="mt-2 border border-gray-300 rounded-lg overflow-y-auto shadow-md bg-white absolute z-20 max-h-[242px]">
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
            </div>
        </WideModal>
    )
}

export default AssignParentModal