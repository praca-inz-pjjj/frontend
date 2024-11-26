import { createHashRouter, RouterProvider } from "react-router-dom";
import { Login as TeacherLogin } from "./pages/teacher/Login";
import { Logout } from "./pages/Logout";
import { Login } from "./pages/Login";
import { Login as ParentLogin } from "./pages/parent/Login";
import { ChildDetails as ParentChildDetails} from "./pages/parent/child/ChildDetails";
import { CreatePermission } from "./pages/parent/child/CreatePermission";
import { Root } from "./pages/Root";
import { Home as TeacherHome } from "./pages/teacher/Home";
import { Class } from "./pages/teacher/class/Class";
import { CreateClass } from "./pages/teacher/CreateClass";
import { CreateChild } from "./pages/teacher/class/CreateChild";
import { Home as ParentHome } from "./pages/parent/Home";
import { ParentsOfChild } from "./pages/teacher/class/child/ParentsChild";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "./recoil-state/auth";
import { CreateParent } from "./pages/teacher/CreateParent";
import { ChangePassword } from "./pages/parent/ChangePassword";
import { Receivers } from "./pages/parent/receiver/Receivers";
import { CreateReceiver } from "./pages/parent/receiver/CreateReceiver";
import { ForbiddenPage } from "./pages/errors/ForbiddenPage";
import { ServerError } from "./pages/errors/ServerError";
import { NotFoundPage } from "./pages/errors/NotFound";
import { Receiver } from "./pages/parent/receiver/Receiver";
import { ResetPassword } from "./pages/Reset";
import { PasswordResetConfirm } from "./pages/ResetPasswordConfirm";

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

export const TEACHER_PATH = "/teacher";
export const PARENT_PATH = "/parent";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/forbidden",
    element: <ForbiddenPage />,
  },
  {
    path: "/error",
    element: <ServerError />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: TEACHER_PATH,
    element: <TeacherHome />,
  },
  {
    path: TEACHER_PATH + "/login",
    element: <TeacherLogin />,
  },
  {
    path: TEACHER_PATH + "/class/:id",
    element: <Class />,
  },
  {
    path: TEACHER_PATH + "/create-class",
    element: <CreateClass />,
  },
  {
    path: TEACHER_PATH + "/class/:id/create",
    element: <CreateChild />,
  },
  {
    path: PARENT_PATH + "/login",
    element: <ParentLogin />,
  },
  {
    path: PARENT_PATH,
    element: <ParentHome />,
  },
  {
    path: PARENT_PATH + "/child/:id",
    element: <ParentChildDetails />,
  },
  {
    path: PARENT_PATH + "/child/:id/create-permission",
    element: <CreatePermission />,
  },
  {
    path: TEACHER_PATH + "/child/:id",
    element: <ParentsOfChild />
  },
  {
    path: TEACHER_PATH + "/create-parent",
    element: <CreateParent />
  },
  {
    path: PARENT_PATH + "/change-password",
    element: <ChangePassword />
  },
  {
    path: PARENT_PATH + "/receivers",
    element: <Receivers />
  },
  {
    path: PARENT_PATH + "/create-receiver",
    element: <CreateReceiver />
  },
  {
    path: PARENT_PATH + "/receiver/:id",
    element: <Receiver />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/reset-password/:uid/:token",
    element: < PasswordResetConfirm />
  }
]
);

function App() {
  return (
    <RecoilRoot>
      <AppWithRecoil>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </AppWithRecoil>
    </RecoilRoot>
  );
}

function AppWithRecoil({children}) {
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    setAuth({
      userType: localStorage.getItem("userType") || "none",
    });
  }, [setAuth]);
  return (
    <div className="App">
      {children}
    </div>
  );
}

export default App;
