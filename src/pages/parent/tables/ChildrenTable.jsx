import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable, { TableProps } from "../../../components/DataTable"
import BlueLinkButton from "../../../components/buttons/BlueLinkButton";

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
    const [data_rows, setDataRows] = useState([])
    const labels = ["#", "Imię i Nazwisko", "Klasa", "Więcej"]

    useEffect(()=>{
      const children_data_rows: Array[never] = children_data?.map((child, index)=>[
        index+1,
        <Link to={`/parent/child/${child.id}`}>{child.first_name + " " + child.last_name}</Link>,
        child.classroom_name,
        <BlueLinkButton to={`/parent/child/${child.id}`} className="text-blue-500 hover:underline"
          text={"Szczegóły"}
        />
      ])
      setDataRows(children_data_rows)
    }, [children_data])

    return (
      <DataTable 
        title={title}
        no_data_message={no_data_message}
        labels={labels}
        data_rows={data_rows}
        />
    )
};
