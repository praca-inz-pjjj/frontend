// ChildrenTable.jsx
import React, { FC, useEffect, useState } from "react";
import DataTable, { TableProps } from "../../../components/DataTable";
import BlueLinkButton from "../../../components/buttons/BlueLinkButton";
import { Link } from "react-router-dom";

interface ReceiversData {
  receiver_id: String;
  receiver_name: String;
  child_name: String;
  parent_name: String;
  date: String;
  signature: Boolean;
  is_parent: Boolean;
}

export interface ReceiversTableProps extends TableProps {
  receivers_data: ReceiversData[];
}

export const ReceiversTable: FC<ReceiversTableProps> = ({
  receivers_data,
  ...props
}) => {
  const labels = [
    "#",
    "Odbierający",
    "Odbierany",
    "Dodany przez",
    "Data dodania",
    "Historia odbiorów",
  ];
  const data_rows = receivers_data
    ?.filter(({ is_parent }) => !is_parent)
    .map((data, index) => [
      index + 1,
      <Link
        to={`/parent/receiver/${data.receiver_id}?child=${data.child}`}
        key={data.receiver_id}
      >
        {data.receiver_name}
      </Link>,
      data.child_name,
      data.parent_name,
      data.date,
      <BlueLinkButton
        to={`/parent/receiver/${data.receiver_id}?child=${data.child}`}
        text={"Historia"}
      />,
    ]);

  return (
    <DataTable
      title={props?.title}
      no_data_message={props?.no_data_message}
      labels={labels}
      data_rows={data_rows}
      buttons={props?.buttons}
    />
  );
};
