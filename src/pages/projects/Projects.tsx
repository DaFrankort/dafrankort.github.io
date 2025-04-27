import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Hero from "./partials/Hero";
import { fetchIndex, IndexProject } from "../../functions/FetchIndex";
import Chip from "../../components/Chip";

function Projects() {
  const [projects, setProjects] = useState<IndexProject[]>([]);
  const maxChipCount = 3;

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
                      content={
                        <div>
                          <div className="mb-1 -mt-3 chip-list-sm">
                            {project.techstack.slice(0, maxChipCount).map((techstack, index) => (
                              <Chip key={index} text={techstack} className="opacity-90" />
                            ))}
                            {project.techstack.length > maxChipCount && (
                              <Chip
                                key={"more"}
                                text={`+ ${project.techstack.length - maxChipCount} ${
                                  project.techstack.length - maxChipCount === 1 ? "other" : "others"
                                }...`}
                                className="opacity-60"
                              />
                            )}
                          </div>
                          <p>{project.excerpt}</p>
                        </div>
                      }
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
