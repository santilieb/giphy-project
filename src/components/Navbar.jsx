// Navigation bar component, it displays the 3 NavbarItems

import { IconImage, IconSearch, IconLike } from "../img/sprite.jsx";
import NavbarItem from "./NavbarItem.jsx";

function Navbar() {
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
