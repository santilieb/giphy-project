import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../api/config.js";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { IconNext } from "../img/sprite.jsx";

function Random() {
  const [randomGif, setRandomGif] = useState({});
  // Fetch one random GIF from the Giphy API
  const fetchRandomGif = async () => {
    const url = `${BASE_URL}random?api_key=${API_KEY}&rating=g`;
    // Destructure the data object from the response
    const { data } = await fetchData(url);
    const gif = storeGifs(data);
    setRandomGif(gif);
  };

  // Once the component loads, fetch the GIF once
  useEffect(() => {
    fetchRandomGif();
  }, []);

  //display a random image from the giphy API
  return (
    <section className="section section--random">
      <h2 className="heading-secondary">Random</h2>
      <img
        className="images-container images-container__image images-container__image--random-item"
        src={randomGif.large}
        alt={randomGif.title}
      />
      <button className="btn btn--random" onClick={fetchRandomGif}>
        <IconNext /> Next
      </button>
    </section>
  );
}

export default Random;
