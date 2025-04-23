import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import ProjectDetail from "./pages/project-details/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="mb-[10rem]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="project" element={<Projects />} />
          <Route path="project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
