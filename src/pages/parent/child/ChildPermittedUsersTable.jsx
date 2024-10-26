import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable, { TableProps } from "../../../components/DataTable"


export interface ChildPermittedUserData {
  user_id: String,
  user_name: String,
  parent_name: String,
  date: String,
  signature: Boolean,
  is_parent: Boolean
}

export interface ChildPermittedUsersTableProps extends TableProps {
  permitted_users_data: ChildPermittedUserData[],
}

export const ChildPermittedUsersTable: FC<ChildPermittedUsersTableProps> = ({ 
    title, 
    no_data_message, 
    permitted_users_data 
  }) => {
  const [data_rows, setDataRows] = useState([])
  const labels = ["#", "Odbierający", "Dodany przez", "Data dodania", "Status podpisu", "Więcej"]

  useEffect(()=>{
    const permitted_user_data_rows: Array[never] = permitted_users_data?.filter(({is_parent}) => !is_parent)
      .map((user_data, index)=>[
        index+1,
        user_data.user_name,
        user_data.parent_name,
        user_data.date,
        <span className={user_data?.signature ? "text-green-500" : "text-red-500"}>
          {user_data.signature ? "Dostarczony" : "Niedostarczony"}
        </span>,
        <Link to={`/parent/receiver/${user_data.user_id}`} className="text-blue-500 hover:underline">
          Szczegóły
        </Link>
      ])
    setDataRows(permitted_user_data_rows)
  }, [permitted_users_data])

  return (
    <DataTable 
      title={title}
      no_data_message={no_data_message}
      labels={labels}
      data_rows={data_rows}
      />
  )
};


