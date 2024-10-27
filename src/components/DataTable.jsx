import React, { FC } from "react";

export interface TableProps {
    title: String,
    no_data_message: String,
}

export interface DataTableProps extends TableProps {
    labels: String[],
    data_rows: Array[]
}

const DataTable: FC<DataTableProps> = ({
    title = "Brak Tytułu",
    no_data_message = "- Brak danych -",
    labels = [],
    data_rows = []
}) => {
    if (data_rows?.length === 0) {
        return (
            <>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-8">{no_data_message}</p>
            </>
        )
    }
    return (
        <div className="overflow-x-auto mb-8">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        {labels?.map((label) => <th className="px-4 py-2 border-b border-gray-300 text-left">{label}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data_rows?.map((row, index) => (
                        <tr key={row[0]} className="hover:bg-gray-100">
                            {row.map((value) => <td className="px-4 py-2 border-b border-gray-300">{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;