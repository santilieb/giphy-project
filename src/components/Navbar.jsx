import { useContext, useCallback } from "react";
import ProjectContext from "../context/ProjectContext.jsx";
import { IconImage, IconSearch, IconLike } from "../img/sprite.jsx";

function Navbar() {
  // set the state of the navbar, by default it is random
  const { activeNav, setActiveNav } = useContext(ProjectContext);

  // handle the click event of the navbar
  const handleClick = (tabIndex) => {
    // set the state of the navbar to the clicked element
    setActiveNav(tabIndex);
  };

  return (
    <nav className="navbar">
      <section className="navbar__list">
        <button
          id="random"
          className={`navbar__list-btn ${
            activeNav === 0 ? "navbar__list-btn--active" : ""
          }`}
          onClick={() => handleClick(0)}
        >
          <IconImage className="random__icon" />
        </button>
        <button
          id="finder"
          className={`navbar__list-btn ${
            activeNav === 1 ? "navbar__list-btn--active" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          <IconSearch className="finder__icon" />
        </button>
        <button
          id="trending"
          className={`navbar__list-btn ${
            activeNav === 2 ? "navbar__list-btn--active" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          <IconLike className="trending__icon" />
        </button>
      </section>
    </nav>
  );
}

export default Navbar;
