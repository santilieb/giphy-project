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
          setFinderGifs([]);
          throw new Error("No GIPHYs found, try another search term");
        } else {
          setError(null);
          setFinderGifs(data.data.map((gif) => gif.images.original.url));
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Type something into the searchbar to find GIPHYs");
    }
  };

  // Once the component loads, fetch the GIFs once
  // useEffect(() => {
  //   fetchFinderGifs();
  // }, []);

  return (
    <section className="finder">
      <h1>Finder</h1>
      <input
        type="text"
        placeholder="Search for a GIPHY"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchFinderGifs}>Search</button>
      <div className="finder__gifs">
        {/* If there is an error, show the error message, otherwise show the GIFs */}
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          finderGifs.map((gif, index) => (
            <img src={gif} alt="GIF" key={index} />
          ))
        )}
      </div>
    </section>
  );
}

export default Finder;
