import { useState, useEffect } from "react";
import { storeGifs } from "../api/apiUtils.js";
import { API_KEY, BASE_URL } from "../api/config.js";
import ErrorMessage from "./ErrorMessage.jsx";
import { IconSearch } from "../img/sprite.jsx";
import useFetch from "../hooks/useFetch.jsx";
import LoadingMessage from "./LoadingMessage";
import GifItem from "./GifItem";
import Button from "./Button.jsx";

function Finder() {
  const [clickedSearch, setClickedSearch] = useState(false);
  const [finderGifs, setFinderGifs] = useState([]); // state to store the gifs
  const [searchTerm, setSearchTerm] = useState(""); // state to store the search term
  const [finderError, setFinderError] = useState(""); // state to store the error message
  const url = `${BASE_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=g&lang=en`;
  const { response, isLoading, error, doFetch } = useFetch(url); // custom hook to fetch the data
  const loadingMessage = "Loading searched GIPHYs...";

  const fetchFinderGifs = async () => {
    if (error) {
      setFinderError(error);
      return;
    }

    const { data, pagination } = response;

    if (clickedSearch) {
      if (pagination?.total_count === 0) {
        setFinderError("No GIPHYs found!");
        setTimeout(() => {
          setClickedSearch(false);
        }, 3000);
        return;
      }
    }
    if (data) {
      const gifs = data.map((gif) => storeGifs(gif));
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
      setClickedSearch(true);
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
        setClickedSearch(true);
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
      <h3 className="heading-tertiary heading-tertiary--finder">
        Search for a GIPHY
      </h3>
      <input
        className="searchbar"
        type="text"
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
      {!isLoading && clickedSearch && finderError && (
        <ErrorMessage message={finderError} />
      )}
      {!searchTerm && isLoading && <LoadingMessage message={loadingMessage} />}
      <div className="images-container images-container--finder">
        {!isLoading &&
          !error &&
          !finderError &&
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
    </section>
  );
}

export default Finder;
