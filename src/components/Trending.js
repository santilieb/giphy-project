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
    <section className="section-trending">
      <h2 className="heading-secondary">Trending</h2>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        trendingGifs.map((gif, index) => (
          <img
            className="trending-image"
            src={gif}
            alt="Trending GIF"
            key={index}
          />
        ))
      )}
    </section>
  );
}

export default Trending;
