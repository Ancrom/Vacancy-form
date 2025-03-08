import { NavLink } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="container">
        <NavLink to="/" className="logo"></NavLink>
        <NavLink to="/" className="nav__link">
          Все заявки
        </NavLink>
        <NavLink to="/vacancyform/new" className="nav__link">
          Создание заявки
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
