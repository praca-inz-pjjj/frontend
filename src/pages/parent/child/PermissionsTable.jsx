// ChildrenTable.jsx
import React from "react";
import DataTable from "../../../components/DataTable"
import ColorfulButton from "../../../components/buttons/ColorfulButton";

const PermissionStatusConfig = {
  "SLEEP": "Oczekująca",
  "ACTIVE": "Aktywna",
  "CLOSED": "Zakończona",
  "PERMANENT": "Stała"
}

export const PermissionsTable = ({ 
    permssions,
    handleDeletePermission,
    ...props
  }) => {
  const labels = ["#", "Odbierający", "Początek ważności", "Koniec ważności", "Status", "Dostępne opcje"]
  const data_rows = Object.entries(permssions)?.filter(([id, permission]) => permission.state !== "PERMANENT").map(([id, permission], index)=>[
      index+1,
      permission.user_name,
      permission.start_date,
      permission.end_date,
      PermissionStatusConfig[permission.state] || permission.state,
      <ColorfulButton
        text="Usuń zgodę"
        color="red"
        onClick={handleDeletePermission(permission.permission_id)}
      />
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


