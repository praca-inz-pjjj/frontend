// ChildrenTable.jsx
import React, { FC } from "react";
import { Link } from "react-router-dom";


export interface permittedUserData {
  user_id: String,
  user_name: String,
  child_name: String,
  parent_name: String,
  date: String,
  signature: Boolean,
  is_parent: Boolean
}

export interface PermittedUsersTableProps {
    title: String,
    permitted_users_data: permittedUserData[],
    no_data_message: String
}

export const PermittedUsersTable: FC<PermittedUsersTableProps> = ({ title, permitted_users_data, no_data_message }) => {
  return permitted_users_data && permitted_users_data.length === 0 ? (
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
            <th className="px-4 py-2 border-b border-gray-300 text-left">Odbierający</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Odbierany</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Dodany przez</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Data dodania</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Status podpisu</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Więcej</th>
          </tr>
        </thead>
        <tbody>
          {permitted_users_data?.filter(({is_parent}) => !is_parent).map((user_data, index) => (
            <tr key={user_data.userId} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
              <td className="px-4 py-2 border-b border-gray-300">{user_data.user_name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{user_data.child_name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{user_data.parent_name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{user_data.date}</td>
              <td className={`px-4 py-2 border-b border-gray-300" ${user_data.signature ? "text-green-500" : "text-red-500"}`}>{user_data.signature ? "Dostarczony" : "Niedostarczony"}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <Link
                  to={`/parent/receiver/${user_data.user_id}`}
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
