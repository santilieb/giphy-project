import React, { createContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState("random");
  const [randomGif, setRandomGif] = useState("");
  const [randomError, setRandomError] = useState("");
  const [finderGifs, setFinderGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [finderError, setFinderError] = useState("");
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [trendingError, setTrendingError] = useState("");

  return (
    <ProjectContext.Provider
      value={{
        activeNav,
        setActiveNav,
        randomGif,
        setRandomGif,
        randomError,
        setRandomError,
        finderGifs,
        setFinderGifs,
        searchTerm,
        setSearchTerm,
        finderError,
        setFinderError,
        trendingGifs,
        setTrendingGifs,
        trendingError,
        setTrendingError,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
