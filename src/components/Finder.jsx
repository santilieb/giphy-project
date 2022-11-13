import { useState, useEffect } from "react";
import { fetchData, storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import ErrorMessage from "./ErrorMessage.jsx";
import { IconSearch } from "../img/sprite.jsx";
import useFetch from "../hooks/useFetch.jsx";
import LoadingMessage from "./LoadingMessage";
import GifItem from "./GifItem";
import Button from "./Button.jsx";

function Finder() {
  const [finderGifs, setFinderGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [finderError, setFinderError] = useState("");
  const url = `${BASE_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=g&lang=en`;
  const { response, isLoading, error, doFetch } = useFetch(url);
  const loadingMessage = "Loading searched GIPHYs...";

  const fetchFinderGifs = async () => {
    if (error) {
      setFinderError(error);
      return;
    }

    setFinderError("");
    if (response) {
      const gifs = response.map((gif) => storeGifs(gif));
      if (response.length === 0) {
        setFinderGifs([]);
        setFinderError("No GIPHYs found!");
      }
      setFinderError("");
      setFinderGifs(gifs);
    }
  };

  // Handle the search term input
  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Handle the search button click
  const handleSearchClick = () => {
    if (searchTerm !== "") {
      setFinderGifs([]);
      doFetch(url);
      setSearchTerm("");
    } else {
      setFinderGifs([]);
      setFinderError("Please enter a search term to find GIPHYs!");
    }
  };

  // Handle the enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm !== "") {
        setFinderGifs([]);
        doFetch();
        setSearchTerm("");
      } else {
        setFinderGifs([]);
        setFinderError("Please enter a search term to find GIPHYs!");
        setSearchTerm("");
      }
    }
  };

  useEffect(() => {
    fetchFinderGifs();
  }, [response]);

  return (
    <section className="section section--finder">
      <h2 className="heading-secondary heading-secondary--finder">Finder</h2>
      <input
        className="searchbar"
        type="text"
        placeholder="Search for a GIPHY"
        value={searchTerm}
        onChange={(e) => handleSearchTerm(e)}
        onKeyUp={(e) => {
          handleKeyPress(e);
        }}
      />
      <Button
        icon={<IconSearch />}
        text={"Search"}
        className={"finder"}
        onClick={handleSearchClick}
      />
      {error && <ErrorMessage message={error} />}
      {finderError && <ErrorMessage message={finderError} />}
      {!searchTerm && isLoading && <LoadingMessage message={loadingMessage} />}
      <div className="images-container">
        {!isLoading &&
          finderGifs.map((gif, index) => (
            <GifItem
              key={index}
              alt={gif.title}
              smallSrcSet={gif.small}
              largeSrcSet={gif.large}
              className={"images-container"}
            />
          ))}
      </div>

      {/* {error && <ErrorMessage message={error} />}
      <div className="images-container">
        {finderGifs.map((gif, index) => (
          <ResponsiveImage
            alt={gif.title}
            smallSrcSet={gif.small}
            largeSrcSet={gif.large}
          />
        ))}
      </div> */}
    </section>
  );
}

export default Finder;
