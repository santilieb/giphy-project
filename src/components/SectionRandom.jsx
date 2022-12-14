import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../api/config.js";
import { storeGifs } from "../api/apiUtils.js";
import { IconNext } from "../img/sprite.jsx";
import useFetch from "../hooks/useFetch.jsx";
import LoadingMessage from "./LoadingMessage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import GifItem from "./GifItem.jsx";
import Button from "./Button.jsx";

function Random() {
  const [randomGif, setRandomGif] = useState({}); // state to store the random gif
  const url = BASE_URL + "random?api_key=" + API_KEY + "&rating=g&lang=en";
  const { response, isLoading, error, doFetch } = useFetch(url); // destructuring from result of custom hook to fetch the data
  const loadingMessage = "Loading random GIPHY...";

  // Handler to fetch a new random gif
  const fetchOnClicked = () => {
    setRandomGif({});
    doFetch();
  };

  // Fetch the random gif on page load and when the response changes
  useEffect(() => {
    let { data } = response;
    if (data) {
      const gif = storeGifs(data);
      setRandomGif(gif);
    }
  }, [response]);

  return (
    <section className="section section--random">
      <h2 className="heading-secondary heading-secondary--random">Random</h2>
      {isLoading && <LoadingMessage message={loadingMessage} />}
      {error && <ErrorMessage message={error} />}
      <div className="images-container images-container--random">
        {!isLoading && !error && randomGif && (
          <>
            <GifItem
              alt={randomGif.title}
              smallSrcSet={randomGif.small}
              largeSrcSet={randomGif.large}
            />
          </>
        )}
      </div>
      <Button
        icon={<IconNext />}
        text={"Next"}
        className={"random"}
        onClick={fetchOnClicked}
      />
    </section>
  );
}

export default Random;
