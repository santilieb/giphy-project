// Functional component that fetches trending GIPHYs

import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.js";
import { fetchData } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [error, setError] = useState("");

  // Fetch trending GIFs from the Giphy API
  const fetchTrendingGifs = async () => {
    try {
      const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
      const data = await fetchData(url);

      // Check if the array is empty, if so throw an error
      if (data.data.length === 0) {
        setTrendingGifs([]);
        throw new Error("No trending GIPHYs found");
      } else {
        setError(null);
        setTrendingGifs(data.data.map((gif) => gif.images.original.url));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Once the component loads, fetch the GIFs once
  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  return (
    <section className="section section--trending">
      <h2 className="heading-secondary">Trending</h2>
      {error && <ErrorMessage message={error} />}
      <div className="images-container">
        {trendingGifs.map((gif) => (
          <img
            className="image image--trending-item"
            src={gif}
            alt="trending GIF"
            key={gif}
          />
        ))}
      </div>
    </section>
  );
}

export default Trending;
