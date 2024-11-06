// import { useRecoilValue } from "recoil";
// import { authState } from "../recoil-state/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export default function ReceiveHistory({ data, limit }) {
  return (
    <div className="mb-4">
      <h4 className="text-lg mb-4">Historia odbioru:</h4>
      <div className="relative overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                #
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Dziecko
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Odbierający
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Wydający
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Data
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">
                Decyzja
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ id, child_name, child_surname, receiver_name, receiver_surname, teacher_name, teacher_surname, decision, date }, i) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-300">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {`${child_name} ${child_surname}`}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {`${receiver_name} ${receiver_surname}`}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {`${teacher_name} ${teacher_surname}`}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {new Date(date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {decision ? (
                      <span className="text-green-600">Zaakceptowano</span>
                    ) : (
                      <span className="text-red-600">Odrzucono</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
