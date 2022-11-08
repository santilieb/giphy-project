import "./sass/main.scss";
import Finder from "./components/Finder.js";
import Random from "./components/Random.js";
import Trending from "./components/Trending.js";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <main className="App">
      {/* header div */}
      <header>
        <h1>React Giphy</h1>
      </header>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Random />
        <Finder />
        <Trending />
      </div>
    </main>
  );
}

export default App;
