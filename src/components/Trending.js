// Functional component that fetches trending GIPHYs

import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.js";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [error, setError] = useState("");

  // Fetch trending GIFs from the Giphy API
  const fetchTrendingGifs = async () => {
    try {
      const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
      const { data } = await fetchData(url);
      const gifs = data.map((gif) => storeGifs(gif));

      // Check if the array is empty, if so throw an error
      if (data.length === 0) {
        setTrendingGifs([]);
        throw new Error("No trending GIPHYs found");
      } else {
        setError(null);
        setTrendingGifs(gifs);
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
        {trendingGifs.map((gif, index) => (
          <img
            className="image image--trending-item"
            src={gif.large}
            alt={gif.title}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

export default Trending;
