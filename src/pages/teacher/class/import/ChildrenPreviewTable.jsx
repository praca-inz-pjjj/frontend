import React from "react";
import DataTable from "../../../../components/DataTable";


export const ChildrenPreviewTable = ({ 
    children,
    ...props
  }) => {
  const labels = ["#", "Imię", "Nazwisko", "Data urodzenia"]
  const data_rows = children?.map((child, index)=>[
      index+1,
      child["first_name"],
      child["last_name"],
      child["birth_date"],
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


