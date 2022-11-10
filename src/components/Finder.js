import { useState } from "react";
import { fetchData } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import ErrorMessage from "./ErrorMessage.js";

function Finder() {
  const [finderGifs, setFinderGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch GIFs from the Giphy API based on the search term
  const fetchFinderGifs = async () => {
    if (searchTerm !== "") {
      try {
        const url = `${BASE_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=g&lang=en`;

        const data = await fetchData(url);
        // Check if the array is empty, if so throw an error
        if (data.data.length === 0) {
          throw new Error("No GIPHYs were found, try another search term");
        } else {
          setError(null);
          setFinderGifs(data.data.map((gif) => gif.images.original.url));
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
        Search
      </button>
      {error && <ErrorMessage message={error} />}
      <div className="images-container">
        {finderGifs.map((gif, index) => (
          <img
            key={index}
            className="image image--finder-item"
            src={gif}
            alt="finder GIF"
          />
        ))}
      </div>
    </section>
  );
}

export default Finder;
