import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../api/config.js";
import { storeGifs } from "../api/apiUtils.js";
import { IconNext } from "../img/sprite.jsx";
import ResponsiveImage from "./ResponsiveImage.jsx";
import useFetch from "../hooks/useFetch.jsx";
import LoadingMessage from "./LoadingMessage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

function Random() {
  const [randomGif, setRandomGif] = useState({});
  const url = BASE_URL + "random?api_key=" + API_KEY + "&rating=g&lang=en";
  const { response, isLoading, error, doFetch } = useFetch(url);

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
      {isLoading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}
      {randomGif && (
        <>
          <ResponsiveImage
            alt={randomGif.title}
            smallSrcSet={randomGif.small}
            largeSrcSet={randomGif.large}
            className={"images-container"}
          />
          <button className="btn btn--next" onClick={fetchOnClicked}>
            <IconNext />
          </button>

          {/* <button className="btn btn--random" onClick={() => useFetch(url)}>
            <IconNext /> Next
          </button> */}
        </>
      )}
    </section>
  );

  // const fetchRandomGif = async () => {
  //   const url = `${BASE_URL}random?api_key=${API_KEY}&rating=g`;
  //   // Destructure the data object from the response
  //   const { data } = await fetchData(url);
  //   console.log(data);
  //   const gif = storeGifs(data);
  //   setRandomGif(gif);
  // };

  // // Once the component loads, fetch the GIF once
  // useEffect(() => {
  //   fetchRandomGif();
  // }, []);

  // //display a random image from the giphy API
  // return (
  //   <section className="section section--random">
  //     <h2 className="heading-secondary">Random</h2>
  //     <ResponsiveImage
  //       alt={randomGif.title}
  //       smallSrcSet={randomGif.small}
  //       largeSrcSet={randomGif.large}
  //       className={"images-container"}
  //     />
  //     <button className="btn btn--random" onClick={fetchRandomGif}>
  //       <IconNext /> Next
  //     </button>
  //   </section>
  // );
}

export default Random;
