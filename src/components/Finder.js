import { useState, useEffect } from "react";

function Finder() {
  // Fetch multiple GIFs from the Giphy API
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGifs = async () => {
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=Vg9p79URRw6MAXMa0U80g7UKMu61wOMe&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();

        // Check if the array is empty
        if (data.data.length === 0) {
          throw new Error("No GIFs found");
        }
        if (window.innerWidth < 768) {
          setGifs(data.data.map((gif) => gif.images.fixed_height_small.url));
        }
        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          setGifs(data.data.map((gif) => gif.images.fixed_height.url));
        }
        if (window.innerWidth >= 1024) {
          setGifs(data.data.map((gif) => gif.images.original.url));
        }
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // try {
  //   const url = `https://api.giphy.com/v1/gifs/search?api_key=Vg9p79URRw6MAXMa0U80g7UKMu61wOMe&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // Get the URL of the GIF based on the screen size
  //   if (window.innerWidth < 768) {
  //     setGifs(data.data.map((gif) => gif.images.fixed_height_small.url));
  //   }
  //   if (window.innerWidth >= 768 && window.innerWidth < 1024) {
  //     setGifs(data.data.map((gif) => gif.images.fixed_height.url));
  //   }
  //   if (window.innerWidth >= 1024) {
  //     setGifs(data.data.map((gif) => gif.images.original.url));
  //   } else {
  //     throw new Error("No GIFs found");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  // Once the component loads, fetch the GIFs once
  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <section className="finder">
      <h1>Finder</h1>
      <input
        type="text"
        placeholder="Search for a GIPHY"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchGifs}>Search</button>
      <div className="finder__gifs">
        {gifs.map((gif) => (
          <img src={gif} alt="random GIF" />
        ))}
      </div>
    </section>
  );
}

export default Finder;
