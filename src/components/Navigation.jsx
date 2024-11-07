import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
    if (localStorage.getItem('userType') === 'teacher') {
      setIsTeacher(true);
    }
    if (localStorage.getItem('userType') === 'parent') {
      setIsParent(true);
    }
  }, []);

  // Definiowanie klas bazowych
  const baseLinkClass = "block py-2 px-3 rounded";
  const defaultTextClass = "text-white hover:bg-gray-700";
  const authTeacherClass = "bg-blue-600 text-white";
  const authParentClass = "bg-green-600 text-white";

  // Definiowanie klas opartych na stanie
  const teacherLinkClass = `${baseLinkClass} ${isAuth && isTeacher ? authTeacherClass : defaultTextClass}`;
  const parentLinkClass = `${baseLinkClass} ${isAuth && isParent ? authParentClass : defaultTextClass}`;

  return (
    <nav className="bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white px-4 py-2 hover:bg-gray-700 rounded"
        >
          Powrót
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:flex-row md:space-x-8 md:p-0">
            <li>
              <Link
                to="/"
                className={`${baseLinkClass} ${defaultTextClass}`}
                aria-current="page"
              >
                Strona Główna
              </Link>
            </li>
            <li>
              <Link to="/teacher/login" className={teacherLinkClass}>
                {isAuth && isTeacher ? 'Panel Nauczyciela (Zalogowany)' : 'Panel Nauczyciela'}
              </Link>
            </li>
            <li>
              <Link to="/parent/login" className={parentLinkClass}>
                {isAuth && isParent ? 'Panel Rodzica (Zalogowany)' : 'Panel Rodzica'}
              </Link>
            </li>
            <li>
              <Link
                to={isAuth ? "/logout" : "/login"}
                className={`${baseLinkClass} ${defaultTextClass}`}
              >
                {isAuth ? "Wyloguj" : "Zaloguj"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
