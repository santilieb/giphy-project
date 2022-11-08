// Functional component that fetches trending GIPHYs

import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.js";

function Trending() {
  const [gifs, setGifs] = useState([]);
  const [error, setError] = useState("");

  const fetchGifs = async () => {
    try {
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=Vg9p79URRw6MAXMa0U80g7UKMu61wOMe&limit=10&rating=g`;
      const response = await fetch(url);

      const data = await response.json();

      // Check if the array is empty, if so throw an error
      if (data.data.length === 0) {
        setGifs([]);
        throw new Error("No trending GIPHYs found");
      } else {
        setError(null);
        setGifs(data.data.map((gif) => gif.images.original.url));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Once the component loads, fetch the GIFs once
  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <section className="trending">
      <h1>Trending</h1>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        gifs.map((gif, index) => (
          <img src={gif} alt="Trending GIF" key={index} />
        ))
      )}
    </section>
  );
}

export default Trending;
