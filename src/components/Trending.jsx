import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import LoadingMessage from "./LoadingMessage";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import ResponsiveImage from "./ResponsiveImage.jsx";
import useFetch from "../hooks/useFetch.jsx";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
  const { response, isLoading, error } = useFetch(url);

  useEffect(() => {
    if (response) {
      const gifs = response.map((gif) => storeGifs(gif));
      setTrendingGifs(gifs);
    }
  }, [response]);

  // // Fetch trending GIFs from the Giphy API
  // const fetchTrendingGifs = async () => {
  //   try {
  //     const url = `${BASE_URL}trending?api_key=${API_KEY}&limit=10&rating=g`;
  //     const { data } = await fetchData(url);
  //     const gifs = data.map((gif) => storeGifs(gif));

  //     // Check if the array is empty, if so throw an error
  //     if (data.length === 0) {
  //       setTrendingGifs([]);
  //       throw new Error("No trending GIPHYs found");
  //     } else {
  //       setError(null);
  //       setTrendingGifs(gifs);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // // Once the component loads, fetch the GIFs once
  // useEffect(() => {
  //   fetchTrendingGifs();
  // }, []);

  return (
    <section className="section section--trending">
      <h2 className="heading-secondary">Trending</h2>
      {isLoading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}
      <div className="images-container images-container--trending">
        {trendingGifs.map((gif, index) => (
          <ResponsiveImage
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
