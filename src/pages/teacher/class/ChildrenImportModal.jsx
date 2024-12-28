import AccordionWithHeader from "components/AccordionWithHeader";
import ColorfulButton from "components/buttons/ColorfulButton";
import CsvFileInput from "components/csv/CsvFileInput";
import { validateAndMapParsedChildrenData } from "helpers/validateParsedClassData";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChildrenPreviewTable } from "./import/ChildrenPreviewTable";
import WideModal from "components/modal/WideModal";

function ChildrenImportModal({ isOpen, onClose, handleChildrenImport, classroom_id }) {
  const [classData, setClassData] = useState(null);
  const onFileLoad = (data) => {
    const result = validateAndMapParsedChildrenData(data, classroom_id);
    if (result.error) {
      toast.error(result.error);
      return
    }
    setClassData(result.data);
  }
  const clearData = () => {
    setClassData(null);
  }
  const onImport = () => {
    if (classData) {
      handleChildrenImport(classData, clearData);
    }
  }

  return (
    <WideModal
      title="Importowanie danych dzieci"
      subtitle="Plik CSV powinien zawierać kolumny: 'Imię', 'Nazwisko' oraz 'Data urodzenia' w formacie RRRR-MM-DD."
      isOpen={isOpen}
      action_buttons={
        <>
        <ColorfulButton onClick={onClose(clearData)} text={"Zamknij"} color="slate" />
        <ColorfulButton onClick={onImport} text={"Importuj"} color="primary_green" disabled={!classData} />
        </>
      } >
      {classData ? (
        <div className="flex flex-col space-y-4">
          <div className="text-sm text-gray-500">Wczytano pomyślnie {classData.length} rekordów.</div>
          <div>
            <AccordionWithHeader header="Podgląd wczytanych danych" defaultExpanded={classData.length < 8}>
              <ChildrenPreviewTable title="" children={classData} />
            </AccordionWithHeader>
          </div>
          <div className="flex justify-end">
            <ColorfulButton text="Wybierz inny plik" color="blue" onClick={() => setClassData(null)} />
          </div>
        </div>
      ) : (<CsvFileInput onFileLoad={onFileLoad} />)}
    </WideModal>
  );
}

export default ChildrenImportModal;