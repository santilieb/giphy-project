import { useState } from "react";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import ErrorMessage from "./ErrorMessage.js";
import { IconSearch } from "../img/sprite.jsx";

function Finder() {
  const [finderGifs, setFinderGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch GIFs from the Giphy API based on the search term
  const fetchFinderGifs = async () => {
    if (searchTerm !== "") {
      try {
        const url = `${BASE_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=g&lang=en`;
        // Destructure the data array from the response
        const { data } = await fetchData(url);
        const gifs = data.map((gif) => storeGifs(gif));

        // Check if the array is empty, if so throw an error
        if (data.length === 0) {
          throw new Error("No GIPHYs were found, try another search term");
        } else {
          setError(null);
          setFinderGifs(gifs);
          setSearchTerm("");
        }
      } catch (error) {
        setFinderGifs([]);
        setError(error.message);
        setSearchTerm("");
      }
    } else {
      setFinderGifs([]);
      setError("Type something into the searchbar to find GIPHYs!");
      setSearchTerm("");
    }
  };

  // Search on ENTER key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchFinderGifs();
    }
  };

  // Once the component loads, fetch the GIFs once
  // useEffect(() => {
  //   fetchFinderGifs();
  // }, []);

  return (
    <section className="section section--finder">
      <h2 className="heading-secondary">Finder</h2>
      <input
        className="searchbar"
        type="text"
        placeholder="Search for a GIPHY"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => {
          handleKeyPress(e);
        }}
      />
      <button className="btn btn--finder" onClick={fetchFinderGifs}>
        <IconSearch />
        Search
      </button>
      {error && <ErrorMessage message={error} />}
      <div className="images-container">
        {finderGifs.map((gif, index) => (
          <img
            key={index}
            className="images-container__image images-container__image--finder-item"
            src={gif.large}
            alt={gif.title}
          />
        ))}
      </div>
    </section>
  );
}

export default Finder;
