import React, { useState, createContext } from "react";

const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <ProjectContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
