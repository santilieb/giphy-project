import "./sass/main.scss";
import Finder from "./components/Finder.js";
import Random from "./components/Random.js";
import Trending from "./components/Trending.js";
import Navbar from "./components/Navbar.js";
import Header from "./components/Header";
import ProjectContext from "./context/ProjectContext";
import { useContext } from "react";

function App() {
  const { activeNav } = useContext(ProjectContext);

  return (
    <div className="App">
      <Header />
      <Navbar />

      <main className="main">
        {activeNav === "random" && <Random />}
        {activeNav === "finder" && <Finder />}
        {activeNav === "trending" && <Trending />}
      </main>
    </div>
  );
}

export default App;
