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
          content={
            <div>
              <p className="mb-4">
                I have some projects you can read a little more about, although information is a little bit dated as for
                now!
              </p>
              <div className="card-list">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <Card
                      title={project.display_name}
                      content={<p>{project.excerpt}</p>}
                      buttons={
                        <Button href={`/#/project/${project.file.replace(".json", "")}`}>
                          View {project.display_name}
                        </Button>
                      }
                      isInner={true}
                    />
                  ))
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
