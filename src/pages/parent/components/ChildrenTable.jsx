import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface child {
    id: String,
    name: String,
    surname: String,
    classroom_name: String
}

export interface ChildrenTableProps {
    title: String,
    children: child[],
    no_data_message: String
}

export const ChildrenTable: FC<ChildrenTableProps> = ({ title, children, no_data_message }) => {
    return children && children.length === 0 ? (
        <>
        <h3 className="text-xl font-semibold mb-4">{ title }</h3>
        <p className="text-gray-600 mb-8">{no_data_message}</p>
        </>
    ) : (
    <div className="overflow-x-auto mb-8">
      <h3 className="text-xl font-semibold mb-4">{ title }</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 text-left">#</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Imię</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Nazwisko</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Klasa</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Więcej</th>
          </tr>
        </thead>
        <tbody>
          {children?.map((child, index) => (
            <tr key={child.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
              <td className="px-4 py-2 border-b border-gray-300">{child.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{child.surname}</td>
              <td className="px-4 py-2 border-b border-gray-300">{child.classroom_name}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <Link
                  to={`/parent/child/${child.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Szczegóły
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
