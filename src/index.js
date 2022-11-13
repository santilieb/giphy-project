import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </React.StrictMode>
);
