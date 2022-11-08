import "./sass/main.scss";
import Finder from "./components/Finder.js";
import Random from "./components/Random.js";
import Trending from "./components/Trending.js";
import Navbar from "./components/Navbar.js";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />

      <main className="main">
        <Random />
        <Finder />
        <Trending />
      </main>
    </div>
  );
}

export default App;
