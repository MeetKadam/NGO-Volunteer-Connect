import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  return (
    <>
      {/* Burger menu (three small lines) */}
      <div className={`burger ${isActive ? "active" : ""}`} id="burger" onClick={toggleMenu}>
        <span className="burger-open">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
            <g fill="#252a32" fillRule="evenodd">
              <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
            </g>
          </svg>
        </span>
        <span className="burger-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path
              fill="#252a32"
              fillRule="evenodd"
              d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
            />
          </svg>
        </span>
      </div>

      {/* Sidebar menu */}
      <ul className={`menu ${isActive ? "active" : ""}`} id="menu">
        <li className="menu-item"><a href="#" className="menu-link">Menu Item 1</a></li>
        <li className="menu-item"><a href="#" className="menu-link">Menu Item 2</a></li>
        <li className="menu-item"><a href="#" className="menu-link">Menu Item 3</a></li>
        <li className="menu-item"><a href="#" className="menu-link">Menu Item 4</a></li>
        <li className="menu-item"><a href="#" className="menu-link">Menu Item 5</a></li>
      </ul>

      {/* Close the sidebar if clicking outside */}
      <main className="main" onClick={closeMenu}>
        <div className="container">
          <div className="wrapper"></div>
        </div>
      </main>
    </>
  );
};

export default Sidebar;
