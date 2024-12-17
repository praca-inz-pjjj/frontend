import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/DataTable";


export const ChildrenPreviewTable = ({ 
    children,
    ...props
  }) => {
  const [data_rows, setDataRows] = useState([])
  const labels = ["#", "Imię", "Nazwisko", "Data urodzenia"]

  useEffect(()=>{
    const children_data = children?.map((child, index)=>[
        index+1,
        child["Imię"],
        child["Nazwisko"],
        child["Data urodzenia"],
      ])
    setDataRows(children_data)
  }, [children])

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


