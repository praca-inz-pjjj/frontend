import React, { FC } from "react";
import DataTable, { TableProps } from "../../../components/DataTable"
import ColorfulLinkButton from "../../../components/buttons/ColorfulLinkButton";

export interface ChildData {
    id: String,
    first_name: String,
    last_name: String,
    classroom_name: String
}

export interface ChildrenTableProps extends TableProps {
    children_data: ChildData[],
}

export const ChildrenTable: FC<ChildrenTableProps> = ({ title, children_data, no_data_message }) => {
    const labels = ["#", "Imię i Nazwisko", "Klasa", "Dostępne opcje"]
    const data_rows: Array[never] = children_data?.map((child, index)=>[
      index+1,
      child.first_name + " " + child.last_name,
      child.classroom_name,
      <ColorfulLinkButton
        color="blue"
        to={`/parent/child/${child.id}`}
        text={"Szczegóły"}
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
