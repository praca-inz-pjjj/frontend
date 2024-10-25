import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable, { TableProps } from "../../../components/DataTable"

export interface ChildData {
    id: String,
    name: String,
    surname: String,
    classroom_name: String
}

export interface ChildrenTableProps extends TableProps {
    children_data: ChildData[],
}

export const ChildrenTable: FC<ChildrenTableProps> = ({ title, children_data, no_data_message }) => {
    const [data_rows, setDataRows] = useState([])
    const labels = ["#", "Imię", "Nazwisko", "Klasa", "Więcej"]

    useEffect(()=>{
      const children_data_rows: Array[never] = children_data?.map((child, index)=>[
        index+1,
        child.name,
        child.surname,
        child.classroom_name,
        <Link to={`/parent/child/${child.id}`} className="text-blue-500 hover:underline">
          Szczegóły
        </Link>
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
