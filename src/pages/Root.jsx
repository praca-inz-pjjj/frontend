import { Navigate } from "react-router-dom";
// import { Navigation } from "../components/Navigation";

export const Root = () => {
  return (
    <Navigate to="/login" replace/>
    // <div>
    //   <Navigation />
    //   <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    //     <div className="max-w-lg w-full bg-white p-8 shadow-md rounded-lg mt-[-100px]">
    //       <h1 className="text-3xl font-bold text-gray-800 mb-4">
    //         Witaj w systemie do zarządzania przedszkolem
    //       </h1>
    //       <Link to={"/login"} className="text-blue-600 hover:underline">
    //         Logowanie
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};
