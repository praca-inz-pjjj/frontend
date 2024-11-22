// ChildrenTable.jsx
import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import ColorfulLinkButton from "../../components/buttons/ColorfulLinkButton";


export const ClassroomsTable = ({ 
    classrooms,
    ...props
  }) => {
  const [data_rows, setDataRows] = useState([])
  const labels = ["#", "Nazwa", "Liczba dzieci", "Dostępne opcje"]

  useEffect(()=>{
    const classrooms_data = classrooms?.map(({id, name, size}, index)=>[
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
    setDataRows(classrooms_data)
  }, [classrooms])

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


