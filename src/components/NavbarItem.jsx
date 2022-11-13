// Item component to display in the navbar
// It takes in the following props:
// - id: the id of the navbar item (random, finder or trending)
// - icon: the icon to be displayed on the navbar item

import { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext.jsx";

function NavbarItem({ id, icon, index }) {
  // set the state of the navbar, by default it is 0 (first tab)
  const { activeNav, setActiveNav } = useContext(ProjectContext);

  // handle the click event of the navbar
  const handleClick = (tabIndex) => {
    // set the state of the navbar to the clicked element index (0, 1 or 2)
    setActiveNav(tabIndex);
  };
  return (
    <button
      id={id}
      className={`navbar__list-btn navbar__list-btn--${id} ${
        activeNav === index ? `navbar__list-btn--${id}--active` : ""
      }`}
      onClick={() => handleClick(index)}
    >
      {icon}
    </button>
  );
}

export default NavbarItem;
