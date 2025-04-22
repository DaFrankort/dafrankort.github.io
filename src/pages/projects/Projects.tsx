import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Hero from "./partials/Hero";
import { fetchIndex } from "../../functions/FetchIndex";

export interface Project {
  file: string;
  display_name: string;
  excerpt: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchIndex().then(setProjects);
  }, []);

  return (
    <div className="text-center">
      <Hero />
      <section className="container">
        <Card
          title="Check out my projects!"
          content="I have many projects you can see on this website, feel free to take a look around!"
          buttons={
            <div className="button-list">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.file} className="space-y-2 text-left project-item">
                    <Button href={`/project/${project.file.replace(".json", "")}`}>{project.display_name}</Button>
                    <p>{project.excerpt}</p>
                  </div>
                ))
              ) : (
                <p>Loading projects...</p>
              )}
            </div>
          }
        />
      </section>
    </div>
  );
}

export default Projects;
