import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login as TeacherLogin } from './pages/teacher/Login';
import { Logout } from './pages/Logout';
import { Login } from './pages/Login';
import { Login as ParentLogin } from "./pages/parent/Login";
import { Root } from "./pages/Root";
import { Home as TeacherHome } from "./pages/teacher/Home";
import { Class } from "./pages/teacher/Class";
import { CreateClass } from "./pages/teacher/CreateClass";
import { CreateChild } from "./pages/teacher/CreateChild";
import { Home as ParentHome } from "./pages/parent/Home";
import { ParentsOfChild } from "./pages/teacher/ParentsChild";
import { REACT_APP_BASENAME } from "./constances"

export const TEACHER_PATH = "/teacher"
export const PARENT_PATH = "/parent"
export const TEACHER_CLASS_PATH = TEACHER_PATH + "/class/:id"
export const CHILD_PATH = TEACHER_PATH + "/child/:id"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: TEACHER_PATH,
    element: <TeacherHome />,
  },
  {
    path: TEACHER_PATH+"/login",
    element: <TeacherLogin />,
  },
  {
    path: TEACHER_CLASS_PATH,
    element: <Class />
  },
  {
    path: TEACHER_PATH+"/create-class",
    element: <CreateClass />
  },
  {
    path: TEACHER_CLASS_PATH+"/create",
    element: <CreateChild />
  },
  {
    path: PARENT_PATH+"/login",
    element: <ParentLogin />
  },
  {
    path: PARENT_PATH,
    element: <ParentHome />
  },
  {
    path: CHILD_PATH,
    element: <ParentsOfChild />
  }
],
  {
    basename: "/"+REACT_APP_BASENAME
  },
);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
