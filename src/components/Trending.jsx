import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import LoadingMessage from "./LoadingMessage";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import useFetch from "../hooks/useFetch.jsx";
import GifItem from "./GifItem.jsx";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
  const { response, isLoading, error } = useFetch(url);
  const loadingMessage = "Loading trending GIPHYs...";

  useEffect(() => {
    if (response) {
      const gifs = response.map((gif) => storeGifs(gif));
      setTrendingGifs(gifs);
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
