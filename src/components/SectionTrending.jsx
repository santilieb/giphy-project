import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import LoadingMessage from "./LoadingMessage";
import { storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import useFetch from "../hooks/useFetch.jsx";
import GifItem from "./GifItem.jsx";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]); // state to store the trending gifs
  const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
  const { response, isLoading, error } = useFetch(url); // destructuring from result of custom hook to fetch the data
  const loadingMessage = "Loading trending GIPHYs...";

  // Fetch the trending gifs on page load and when the response changes
  useEffect(() => {
    const { data } = response; // destructuring data from response
    if (data) {
      // if data exists
      const gifs = data.map((gif) => storeGifs(gif)); // map over the data and store the gifs
      setTrendingGifs(gifs); // set the state with the gifs
    }
  }, [response]);

  return (
    <section className="section section--trending">
      <h2 className="heading-secondary heading-secondary--trending">
        Trending
      </h2>
      {isLoading && <LoadingMessage message={loadingMessage} />}
      {error && <ErrorMessage message={error} />}
      <div className="images-container images-container--trending">
        {!isLoading &&
          !error &&
          trendingGifs.map((gif, index) => (
            <GifItem
              key={index}
              alt={gif.title}
              smallSrcSet={gif.small}
              largeSrcSet={gif.large}
            />
          ))}
      </div>
    </section>
  );
}

export default Trending;
