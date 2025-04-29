import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Hero from "./partials/Hero";
import { fetchIndex, IndexProject } from "../../functions/FetchIndex";
import ProjectCard from "./partials/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState<IndexProject[]>([]);

  useEffect(() => {
    fetchIndex().then(setProjects);
  }, []);

  return (
    <div className="text-center">
      <Hero />
      <section className="container">
        <Card
          title="GitHub Projects"
          content={
            <div className="space-y-4 ">
              <p>
                I have some projects you can read a little more about, although information is a little bit dated as for
                now!
              </p>

              <div className="flex items-center justify-between w-full h-10 px-4 py-1 bg-opacity-50 rounded-3xl bg-primary-950">
                <p>Make this an actual searchbar!</p>
                <button className="transition-transform hover:-rotate-12 hover:scale-125 hover:text-text-50">
                  <i className="fa-solid fa-magnifying-glass "></i>
                </button>
              </div>

              <div className="card-list">
                {projects.length > 0 ? (
                  projects.map((project) => <ProjectCard project={project} />)
                ) : (
                  <p>Loading projects...</p>
                )}
              </div>
            </div>
          }
        />
      </section>
    </div>
  );
}

export default Projects;
