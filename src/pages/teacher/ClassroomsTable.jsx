// ChildrenTable.jsx
import React from "react";
import DataTable from "../../components/DataTable";
import ColorfulLinkButton from "../../components/buttons/ColorfulLinkButton";


export const ClassroomsTable = ({ 
    classrooms,
    ...props
  }) => {
  const labels = ["#", "Nazwa", "Rozmiar klasy", "Dostępne opcje"]
  const data_rows = classrooms?.map(({id, name, size}, index)=>[
      index+1,
      name,
      size,
      <ColorfulLinkButton
          key={id}
          to={`/teacher/class/${id}`}
          text="Zarządzaj"
          color="blue"
      />,
    ]).filter((permission)=> permission[4] !== "PERMANENT")
    

  return (
    <DataTable 
      title={props?.title}
      no_data_message={props?.no_data_message}
      labels={labels}
      data_rows={data_rows}
      buttons={props?.buttons}
      />
  )
};


