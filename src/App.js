import "./sass/main.scss";
import Finder from "./components/Finder.js";
import Random from "./components/Random.js";
import Trending from "./components/Trending.js";
import Navbar from "./components/Navbar.js";
import Header from "./components/Header";
import { useContext, useState } from "react";
import ProjectContext from "./context/ProjectContext";

function App() {
  const { activeNav } = useContext(ProjectContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const renderContent = () => {
    switch (activeNav) {
      case "random":
        return <Random />;
      case "finder":
        return <Finder />;
      case "trending":
        return <Trending />;
      default:
        return <Random />;
    }
  };

  const renderContentDesktop = () => {
    return (
      <div className="main__content--desktop">
        <Random />
        <Finder />
        <Trending />
      </div>
    );
  };

  //Function to handle the resize of the window
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  //Add the event listener to the window
  window.addEventListener("resize", handleResize);

  return (
    <div className="App">
      <Header />

      <main className="main">
        {windowWidth < 1024 ? (
          <>
            <Navbar />
            <div className="main__content">{renderContent()}</div>
          </>
        ) : (
          <div className="main__content">{renderContentDesktop()}</div>
        )}
      </main>
    </div>
  );
}

export default App;
