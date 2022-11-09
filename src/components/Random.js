import { useState, useEffect } from "react";

function Random() {
  // Fetch one random GIF from the Giphy API
  const [gif, setGif] = useState("");

  const fetchGif = async () => {
    const url =
      "https://api.giphy.com/v1/gifs/random?api_key=Vg9p79URRw6MAXMa0U80g7UKMu61wOMe";
    const response = await fetch(url);
    const data = await response.json();
    setGif(data.data.images.original.url);
  };

  // Once the component loads, fetch the GIF once
  useEffect(() => {
    fetchGif();
  }, []);

  //display a random image from the giphy API
  return (
    <section className="random">
      <h1>Random</h1>
      <img src={gif} alt="random GIF" />
      <button onClick={fetchGif}>Next</button>
    </section>
  );
}

export default Random;
