import { createHashRouter, RouterProvider } from "react-router-dom";
import { Login as TeacherLogin } from "./pages/teacher/Login";
import { Logout } from "./pages/Logout";
import { Login } from "./pages/Login";
import { Login as ParentLogin } from "./pages/parent/Login";
import { ChildDetails as ParentChildDetails} from "./pages/parent/ChildDetails";
import { CreatePermission } from "./pages/parent/CreatePermission";
import { Root } from "./pages/Root";
import { Home as TeacherHome } from "./pages/teacher/Home";
import { Class } from "./pages/teacher/Class";
import { CreateClass } from "./pages/teacher/CreateClass";
import { CreateChild } from "./pages/teacher/CreateChild";
import { Home as ParentHome } from "./pages/parent/Home";
import { ParentsOfChild } from "./pages/teacher/ParentsChild";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "./recoil-state/auth";
import { CreateParent } from "./pages/teacher/CreateParent";
import { ChangePassword } from "./pages/parent/ChangePassword";

export const TEACHER_PATH = "/teacher";
export const PARENT_PATH = "/parent";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
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
  }
]
);

function App() {
  return (
    <RecoilRoot>
      <AppWithRecoil></AppWithRecoil>
    </RecoilRoot>
  );
}

function AppWithRecoil() {
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    setAuth({
      userType: localStorage.getItem("userType") || "none",
    });
  }, [setAuth]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
