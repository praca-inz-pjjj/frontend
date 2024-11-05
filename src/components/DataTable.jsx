import React, { FC, ReactNode } from "react";

export interface TableProps {
  title: any;
  no_data_message: String;
  buttons?: ReactNode[];
}

export interface DataTableProps extends TableProps {
  labels: String[];
  data_rows: Array[];
}

const DataTable: FC<DataTableProps> = ({
  title = "Brak Tytułu",
  no_data_message = "Brak danych. Spróbuj odświeżyć stronę.",
  labels = [],
  data_rows = [],
  buttons = [],
}) => {
  if (data_rows?.length === 0) {
    return (
      <div className="overflow-x-auto mb-16 shadow-lg rounded-lg border border-gray-200">
        <div className="flex justify-between items-center px-4 py-3 bg-blue-50 rounded-t-lg">
          <h3 className="text-xl">{title}</h3>
          <div className="flex space-x-2">
            {buttons.map((button, index) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        </div>
        <p className="px-4 py-3 text-gray-500 text-left border-b border-gray-300">
          {no_data_message}
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto mb-16 shadow-lg rounded-lg border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 bg-blue-50">
        <h3 className="text-xl">{title}</h3>
        <div className="flex space-x-2">
          {buttons.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-gray-800">
            {labels?.map((label, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold border-b border-gray-300"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data_rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition-colors`}
            >
              {row.map((value, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 border-b border-gray-200 text-gray-700"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
