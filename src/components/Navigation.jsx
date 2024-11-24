import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../resources/logo/logo.png';

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

  const baseLinkClass = "block py-2 px-3 rounded";
  const defaultTextClass = "text-gray-800 hover:bg-gray-200 font-semibold";
  const authTeacherClass = "bg-blue-100 text-blue-800 hover:bg-blue-200 font-semibold";
  const authParentClass = "bg-green-100 text-green-800 hover:bg-green-200 font-semibold";
  const loginLinkClass = `${baseLinkClass} ${isAuth ? defaultTextClass : "bg-blue-100 text-blue-800 hover:bg-blue-200 font-semibold rounded"}`;

  const teacherLinkClass = `${baseLinkClass} ${isAuth && isTeacher ? authTeacherClass : defaultTextClass}`;
  const parentLinkClass = `${baseLinkClass} ${isAuth && isParent ? authParentClass : defaultTextClass}`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pr-4">
        <div className="flex items-start space-x-4 md:space-x-8 items-center">
          <Link className="hover:bg-gray-200 p-4" to="/">
            <img
              src={logo}
              alt="SafeKid Logo"
              className="h-8"
            />
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 px-4 py-2 hover:bg-gray-200 rounded font-semibold"
          >
            Powrót
          </button>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:flex-row md:space-x-8 md:p-0">
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
                className={loginLinkClass}
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
