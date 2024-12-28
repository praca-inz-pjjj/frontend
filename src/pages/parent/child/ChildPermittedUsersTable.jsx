import React, { FC } from "react";
import DataTable, { TableProps } from "../../../components/DataTable"
import ColorfulLinkButton from "../../../components/buttons/ColorfulLinkButton";


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
  child_id: String
}

export const ChildPermittedUsersTable: FC<ChildPermittedUsersTableProps> = ({ 
    title, 
    no_data_message, 
    permitted_users_data,
    child_id
  }) => {
  const labels = ["#", "Odbierający", "Dodany przez", "Data dodania", "Status zgody", "Dostępne opcje"]
  const data_rows: Array[never] = permitted_users_data?.filter(({is_parent}) => !is_parent)
    .map((user_data, index)=>[
      index+1,
      user_data.user_name,
      user_data.parent_name,
      user_data.date,
      <span className={(user_data?.signature ? "text-green-500" : "text-red-500") + " font-semibold"}>
        {user_data.signature ? "Dostarczona" : "Niedostarczona"}
      </span>,
      <ColorfulLinkButton
        color="blue"
        to={`/parent/receiver/${user_data.user_id}?child=${child_id}`}
        text={"Historia odbiorów"}
      />
    ])

  return (
    <DataTable 
      title={title}
      no_data_message={no_data_message}
      labels={labels}
      data_rows={data_rows}
      />
  )
};


