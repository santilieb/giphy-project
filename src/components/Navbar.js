import { useContext } from "react";
import ProjectContext from "../context/ProjectContext";

function Navbar() {
  // set the state of the navbar, by default it is random
  const { activeNav, setActiveNav } = useContext(ProjectContext);

  // handle the click event of the navbar
  const handleClick = (e) => {
    // set the state of the navbar to the clicked element
    setActiveNav(e.target.id);
  };

  return (
    <nav className="navbar">
      <section className="navbar__list">
        <button
          id="random"
          className={`navbar__list-btn ${
            activeNav === "random" ? "navbar__list-btn--active" : ""
          }`}
          onClick={handleClick}
        >
          Random icon
        </button>
        <button
          id="finder"
          className={`navbar__list-btn ${
            activeNav === "finder" ? "navbar__list-btn--active" : ""
          }`}
          onClick={handleClick}
        >
          Finder icon
        </button>
        <button
          id="trending"
          className={`navbar__list-btn ${
            activeNav === "trending" ? "navbar__list-btn--active" : ""
          }`}
          onClick={handleClick}
        >
          Trending icon
        </button>
      </section>
    </nav>
  );
}

export default Navbar;
