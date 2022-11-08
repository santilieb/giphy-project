import { useState } from "react";

function Navbar() {
  // set the state of the navbar, by default it is random
  const [activeNav, setActiveNav] = useState("random");

  // handle the click event of the navbar
  const handleClick = (e) => {
    // set the state of the navbar to the clicked element
    setActiveNav(e.target.id);
  };

  return (
    <nav className="navbar">
      <h1>Navbar</h1>
      <ul className="navbar__list">
        <li
          id="random"
          className={`navbar__list-item ${
            activeNav === "random" ? "active" : ""
          }`}
          onClick={handleClick}
        >
          Random icon
        </li>
        <li
          id="finder"
          className={`navbar__list-item ${
            activeNav === "finder" ? "active" : ""
          }`}
          onClick={handleClick}
        >
          Finder icon
        </li>
        <li
          id="trending"
          className={`navbar__list-item ${
            activeNav === "trending" ? "active" : ""
          }`}
          onClick={handleClick}
        >
          Trending icon
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
