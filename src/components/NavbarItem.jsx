import { useContext } from "react";
import ProjectContext from "../context/ProjectContext.jsx";

function NavbarItem({ id, icon, index }) {
  // set the state of the navbar, by default it is 0 (random tab)
  const { activeNav, setActiveNav } = useContext(ProjectContext);

  // handle the click event of the navbar
  const handleClick = (tabIndex) => {
    // set the state of the navbar to the clicked element
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
