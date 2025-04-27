import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import ProjectDetail from "./pages/project-details/ProjectDetail";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

function App() {
  return (
    <HashRouter>
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="project" element={<Projects />} />
          <Route path="project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
