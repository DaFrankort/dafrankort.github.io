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
            <div>
              <p className="mb-4">
                I have some projects you can read a little more about, although information is a little bit dated as for
                now!
              </p>
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
