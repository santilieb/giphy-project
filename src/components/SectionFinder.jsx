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
  const url = `${BASE_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=20&rating=g&lang=en`;
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
    setClickedSearch(true);
    if (searchTerm !== "") {
      setFinderGifs([]);
      doFetch(url);
      setSearchTerm("");
      setClickedSearch(true);
    } else {
      setFinderGifs([]);
      setFinderError("Please enter a search term to find GIPHYs!");
      setTimeout(() => {
        setFinderError("");
      }, 3000);
    }
  };

  // Handle the enter key press
  const handleKeyPress = (e) => {
    setClickedSearch(true);
    if (e.key === "Enter") {
      if (searchTerm !== "") {
        setFinderGifs([]);
        doFetch();
        setSearchTerm("");
      } else {
        setFinderGifs([]);
        setFinderError("Please enter a search term to find GIPHYs!");
        setSearchTerm("");
        setTimeout(() => {
          setFinderError("");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    fetchFinderGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Display the error message from the API */}
      {error && <ErrorMessage message={error} />}

      {/* Display the error custom error messages, if it isn't loading and only if the search button has been clicked */}
      {!isLoading && !error && clickedSearch && finderError && (
        <ErrorMessage message={finderError} />
      )}

      {/* Display the loading message, if it is loading and only if the search button has been clicked and a search term has been stored */}
      {!searchTerm && clickedSearch && isLoading && (
        <LoadingMessage message={loadingMessage} />
      )}
      <div className="images-container images-container--finder">
        {/* Display the gifs, if it isn't loading and the error states are empty*/}
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