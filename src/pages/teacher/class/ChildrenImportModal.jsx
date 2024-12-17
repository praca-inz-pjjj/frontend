import AccordionWithHeader from "components/AccordionWithHeader";
import ColorfulButton from "components/buttons/ColorfulButton";
import CsvFileInput from "components/csv/CsvFileInput";
import { validateAndMapParsedChildrenData } from "helpers/validateParsedClassData";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChildrenPreviewTable } from "./import/ChildrenPreviewTable";

function ChildrenImportModal({ isOpen, onClose, handleChildrenImport, classroom_id }) {
  const [classData, setClassData] = useState(null);
  const onFileLoad = (data) => {
    const result = validateAndMapParsedChildrenData(data, classroom_id);
    if (result.error) {
      toast.error(`Błąd wczytywania: ${result.error}.`);
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
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
      <div className="flex justify-center items-center min-h-screen pb-20 px-2 sm:px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="flex flex-col space-y-8 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full px-6 py-4" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <h3 className="text-xl font-medium text-gray-900" id="modal-headline">
            Importowanie danych dzieci
          </h3>
          { classData ? (
            <div className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500">Wczytano pomyślnie {classData.length} rekordów.</div>
              <div>
                <AccordionWithHeader header="Podgląd wczytanych danych" defaultExpanded={classData.length < 8}>
                  <ChildrenPreviewTable title="" children={classData} />
                </AccordionWithHeader>
              </div>
              <div className="flex justify-end">
                <ColorfulButton text="Wybierz inny plik" color="blue" onClick={()=>setClassData(null)} />
              </div>
            </div>
          ) : (<CsvFileInput onFileLoad={onFileLoad} />) }
          <div className="flex justify-between sm:justify-end space-x-2">
            <ColorfulButton onClick={onClose(clearData)} text={"Zamknij"} color="slate" />
            <ColorfulButton onClick={onImport} text={"Importuj"} color="primary_green" disabled={!classData}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildrenImportModal;