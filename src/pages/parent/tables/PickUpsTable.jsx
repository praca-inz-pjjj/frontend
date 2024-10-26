import React, { FC, useEffect, useState } from "react";
import DataTable, { TableProps } from "../../../components/DataTable"

export interface PickUpData {
    id: String
}

export interface PickUpsTableProps extends TableProps {
    pick_ups_data: PickUpData[],
}

export const PickUpsTable: FC<PickUpsTableProps> = ({ 
  title, 
  pick_ups_data,
  no_data_message
}) => {
    const [data_rows, setDataRows] = useState([])
    const labels = ["#"]

    useEffect(()=>{
      const pick_ups_data_rows: Array[never] = pick_ups_data?.map(([pick_up_data], index)=>[
        index+1,
      ])
      setDataRows(pick_ups_data_rows)
    }, [pick_ups_data])

    return (
      <DataTable 
        title={title}
        no_data_message={no_data_message}
        labels={labels}
        data_rows={data_rows}
        />
    )
};
