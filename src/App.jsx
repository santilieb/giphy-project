import "./sass/main.scss";
import Finder from "./components/SectionFinder.jsx";
import Random from "./components/SectionRandom.jsx";
import Trending from "./components/SectionTrending.jsx";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import { useContext, useState } from "react";
import ProjectContext from "./contexts/ProjectContext.jsx";

function App() {
  const { activeNav } = useContext(ProjectContext); // Get the activeNav state from the context
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Get the window width

  //render content (below 1024px)
  // Depending on the activeNav state, render the corresponding section
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

  //render content for desktop (above 1024px)
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

  //Adding the event listener to the window
  window.addEventListener("resize", handleResize);

  return (
    <div className="App">
      <Header />
      <main className="main">
        {/* If the window is less than 1024px, the content will be rendered using renderContent function
        otherwise, it will be rendered using renderContentDesktop function */}
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
