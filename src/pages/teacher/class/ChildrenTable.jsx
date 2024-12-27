// ChildrenTable.jsx
import React from "react";
import DataTable from "../../../components/DataTable";
import ColorfulLinkButton from "../../../components/buttons/ColorfulLinkButton";


export const ChildrenTable = ({ 
    children,
    ...props
  }) => {
  const labels = ["#", "Imię i Nazwisko", "Data urodzenia", "Dostępne opcje"]
  const data_rows = children?.map(({id, name, surname, birth_date}, index)=>[
      index+1,
      name + " " + surname,
      birth_date,
      <ColorfulLinkButton
          key={id}
          to={`/teacher/child/${id}`}
          text="Szczegóły"
          color="blue"
      />,
    ])

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


