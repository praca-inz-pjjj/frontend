// ChildrenTable.jsx
import React from "react";
import DataTable from "../../../../components/DataTable";
import ColorfulButton from "../../../../components/buttons/ColorfulButton";


export const ParentsTable = ({ 
    parents,
    ...props
  }) => {
  const labels = ["#", "Imię i Nazwisko", "Adres email", "Telefon", "Dostępne opcje"]

  const data_rows = parents?.map(({id, first_name, last_name, phone_number, email}, index)=>[
      index+1,
      first_name + " " + last_name,
      email,
      phone_number,
      <ColorfulButton
          key={id}
          onClick={props?.handleRemoveParent(id)}
          text="Usuń przypisanie"
          color="red"
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


