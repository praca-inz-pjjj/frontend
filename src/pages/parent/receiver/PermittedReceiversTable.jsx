// ChildrenTable.jsx
import React, { FC, useEffect, useState } from "react";
import DataTable, { TableProps } from "../../../components/DataTable"
import ColorfulLinkButton from "../../../components/buttons/ColorfulLinkButton";


interface ReceiversData {
  receiver_id: String,
  receiver_name: String,
  child_name: String,
  parent_name: String,
  date: String,
  signature: Boolean,
  is_parent: Boolean
}

export interface PermittedReceiversTableProps extends TableProps {
  receivers_data: ReceiversData[],
}

export const PermittedReceiversTable: FC<PermittedReceiversTableProps> = ({ 
    receivers_data,
    ...props
  }) => {
  const [data_rows, setDataRows] = useState([])
  const labels = ["#", "Odbierający", "Odbierany", "Dodany przez", "Data dodania", "Pisemna zgoda", "Dostępne opcje"]

  useEffect(()=>{
    const permitted_user_data_rows: Array[never] = receivers_data?.filter(({is_parent}) => !is_parent)
      .map((data, index)=>[
        index+1,
        data.receiver_name,
        data.child_name,
        data.parent_name,
        data.date,
        <span className={(data?.signature ? "text-green-500" : "text-red-500") + " font-semibold"}>
          {data.signature ? "Dostarczona" : "Niedostarczona"}
        </span>,
        <ColorfulLinkButton
          to={`/parent/receiver/${data.receiver_id}?child=${data.child_id}`}
          text={"Historia odbiorów"}
          color="blue"
        />
      ])
    setDataRows(permitted_user_data_rows)
  }, [receivers_data])

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


