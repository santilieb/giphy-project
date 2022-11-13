import { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext.jsx";
import { IconImage, IconSearch, IconLike } from "../img/sprite.jsx";
import NavbarItem from "./NavbarItem.jsx";

function Navbar() {
  // set the state of the navbar, by default it is 0 (random)
  // const { activeNav, setActiveNav } = useContext(ProjectContext);

  // // handle the click event of the navbar
  // const handleClick = (tabIndex) => {
  //   // set the state of the navbar to the clicked element
  //   setActiveNav(tabIndex);
  // };

  return (
    <nav className="navbar">
      <section className="navbar__list">
        <NavbarItem
          id="random"
          icon={<IconImage className="random__icon" />}
          index={0}
        />
        <NavbarItem
          id="finder"
          icon={<IconSearch className="finder__icon" />}
          index={1}
        />
        <NavbarItem
          id="trending"
          icon={<IconLike className="trending__icon" />}
          index={2}
        />
      </section>
    </nav>
  );
}

export default Navbar;
