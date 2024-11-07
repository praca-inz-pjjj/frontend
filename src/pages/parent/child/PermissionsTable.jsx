// ChildrenTable.jsx
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable"
import ColorfulButton from "../../../components/buttons/ColorfulButton";


export const PermissionsTable = ({ 
    permssions,
    ...props
  }) => {
  const [data_rows, setDataRows] = useState([])
  const labels = ["#", "Odbierający", "Początek ważności", "Koniec ważności","Status", "Wycofaj zgodę"]

  useEffect(()=>{
    const permissions_data = Object.entries(permssions)?.map(([id, permission], index)=>[
        index+1,
        permission.user_name,
        permission.start_date,
        permission.end_date,
        permission.state === "SLEEP" ? "Oczekujące" : permission.state,
        <ColorfulButton text="Wycofaj" color="red" onClick={()=>{console.log("Wycofaj")}}/>
      ]).filter((permission)=> permission[4] !== "PERMANENT")
    setDataRows(permissions_data)
  }, [permssions])

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


