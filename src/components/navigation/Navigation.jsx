import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/logo/logo.png';
import OpenMenuButton from './OpenMenuButton';
import CloseMenuButton from './CloseMenuButton';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isSlideOutMenuOpen, setIsSlideOutMenuOpen] = useState(false);

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

  const teacherLinkClass = `${baseLinkClass} ${isAuth && isTeacher ? authTeacherClass : defaultTextClass}`;
  const parentLinkClass = `${baseLinkClass} ${isAuth && isParent ? authParentClass : defaultTextClass}`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        <Link className="p-2" to="/">
          <img src={logo} alt="SafeKid Logo" className="h-8" />
        </Link>

        {!isSlideOutMenuOpen && <OpenMenuButton setIsSlideOutMenuOpen={setIsSlideOutMenuOpen}/>}
        {isSlideOutMenuOpen && <CloseMenuButton setIsSlideOutMenuOpen={setIsSlideOutMenuOpen}/>}

        <div className="hidden md:block">
          <StaticNavigation
            isAuth={isAuth}
            isTeacher={isTeacher}
            isParent={isParent}
            teacherLinkClass={teacherLinkClass}
            parentLinkClass={parentLinkClass}
            baseLinkClass={baseLinkClass}
            defaultTextClass={defaultTextClass}
          />
        </div>
      </div>

      {isSlideOutMenuOpen && (
        <div className="md:hidden border-t border-gray-200" id="slideout-menu">
          <SlideOutNavigation
            isAuth={isAuth}
            isTeacher={isTeacher}
            isParent={isParent}
            teacherLinkClass={teacherLinkClass}
            parentLinkClass={parentLinkClass}
            baseLinkClass={baseLinkClass}
            defaultTextClass={defaultTextClass}
          />
        </div>
      )}
    </nav>
  );
}

function StaticNavigation({ isAuth, isTeacher, isParent, teacherLinkClass, parentLinkClass, baseLinkClass, defaultTextClass }) {
  return (
    <ul className="flex flex-row space-x-8">
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
        <Link to={isAuth ? "/logout" : "/login"} className={`${baseLinkClass} ${defaultTextClass}`}>
          {isAuth ? "Wyloguj" : "Zaloguj"}
        </Link>
      </li>
    </ul>
  );
}

function SlideOutNavigation({ isAuth, isTeacher, isParent, teacherLinkClass, parentLinkClass, baseLinkClass, defaultTextClass }) {
  return (
    <ul className="flex flex-col p-4 space-y-2">
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
        <Link to={isAuth ? "/logout" : "/login"} className={`${baseLinkClass} ${defaultTextClass}`}>
          {isAuth ? "Wyloguj" : "Zaloguj"}
        </Link>
      </li>
    </ul>
  );
}
