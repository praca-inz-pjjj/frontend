import React, { FC } from "react";
import DataTable, { TableProps } from "../../../components/DataTable";

export interface PickUpData {
  id: string;
  receiver_name: string;
  receiver_surname: string;
  teacher_name: string;
  teacher_surname: string;
  decision: boolean;
  date: string;
  child: string;
  child_name: string;
  child_surname: string;
  receiver: string;
  teacher: string;
}

export interface PickUpsTableProps extends TableProps {
  pick_ups_data: PickUpData[];
}

export const PickUpsTable: FC<PickUpsTableProps> = ({
  title,
  pick_ups_data,
  no_data_message,
}) => {
  const labels = [
    "#",
    "Dziecko",
    "Odbierający",
    "Nauczyciel",
    "Decyzja",
    "Data",
  ];
  const data_rows: Array[never] = pick_ups_data?.map(
    (row, index) => [
      index + 1,
      `${row.child_name} ${row.child_surname}`,
      `${row.receiver_name} ${row.receiver_surname}`,
      `${row.teacher_name} ${row.teacher_surname}`,
      row.decision ? (
        <span className="text-green-500 font-semibold">Odbiór</span>
      ) : (
        <span className="text-red-500 font-semibold">Brak odbioru</span>
      ),
      new Date(row.date).toLocaleString(),
    ]
  );

  return (
    <DataTable
      title={title}
      no_data_message={no_data_message}
      labels={labels}
      data_rows={data_rows}
    />
  );
};
