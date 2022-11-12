import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../api/config.js";
import { storeGifs } from "../api/apiUtils.js";
import { IconNext } from "../img/sprite.jsx";
import useFetch from "../hooks/useFetch.jsx";
import LoadingMessage from "./LoadingMessage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import GifItem from "./GifItem.jsx";

function Random() {
  const [randomGif, setRandomGif] = useState({});
  const url = BASE_URL + "random?api_key=" + API_KEY + "&rating=g&lang=en";
  const { response, isLoading, error, doFetch } = useFetch(url);
  const loadingMessage = "Loading random GIPHY...";

  const fetchOnClicked = () => {
    setRandomGif({});
    doFetch();
  };

  useEffect(() => {
    if (response) {
      const gif = storeGifs(response);
      setRandomGif(gif);
    }
  }, [response]);

  return (
    <section className="section section--random">
      <h2 className="heading-secondary">Random</h2>
      {isLoading && <LoadingMessage message={loadingMessage} />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && randomGif && (
        <>
          <GifItem
            alt={randomGif.title}
            smallSrcSet={randomGif.small}
            largeSrcSet={randomGif.large}
            className={"images-container"}
          />
          <button className="btn btn--next" onClick={fetchOnClicked}>
            <IconNext />
            Next
          </button>
        </>
      )}
    </section>
  );
}

export default Random;
