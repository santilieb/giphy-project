import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../api/config.js";
import { fetchData } from "../api/apiUtils.js";

function Random() {
  // Fetch one random GIF from the Giphy API
  const [randomGif, setRandomGif] = useState("");

  const fetchRandomGif = async () => {
    const url = `${BASE_URL}random?api_key=${API_KEY}&rating=g`;
    const data = await fetchData(url);
    setRandomGif(data.data.images.original.url);
  };

  // Once the component loads, fetch the GIF once
  useEffect(() => {
    fetchRandomGif();
  }, []);

  //display a random image from the giphy API
  return (
    <section className="random">
      <h1>Random</h1>
      <img src={randomGif} alt="random GIF" />
      <button onClick={fetchRandomGif}>Next</button>
    </section>
  );
}

export default Random;
