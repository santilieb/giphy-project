import "./sass/main.scss";
import Finder from "./components/Finder.jsx";
import Random from "./components/Random.jsx";
import Trending from "./components/Trending.jsx";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import { useContext, useState } from "react";
import ProjectContext from "./context/ProjectContext.jsx";

function App() {
  const { activeNav } = useContext(ProjectContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //render content (below 1024px)
  const renderContent = () => {
    switch (activeNav) {
      case 0:
        return <Random />;
      case 1:
        return <Finder />;
      case 2:
        return <Trending />;
      default:
        return <Random />;
    }
  };

  //render contend (desktop)
  const renderContentDesktop = () => {
    return (
      <>
        <Random />
        <Finder />
        <Trending />
      </>
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
            <div className="section-container">{renderContent()}</div>
          </>
        ) : (
          <div className="section-container">{renderContentDesktop()}</div>
        )}
      </main>
    </div>
  );
}

export default App;
