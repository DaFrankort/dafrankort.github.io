import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export interface Project {
  file: string;
  display_name: string;
  excerpt: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/content/index.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.repos);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="text-center">
      <div className="space-y-8">
        <section className="container">
          <Card
            title="Check out my projects!"
            content="I have many projects you can see on this website, feel free to take a look around!"
          >
            <div className="button-list">
              {projects.length > 0 ? (
                // Loop through the projects and create a button for each
                projects.map((project) => (
                  <div key={project.file} className="project-item">
                    <Button href={`project/${project.file.replace(".json", "")}`}>{project.display_name}</Button>
                    <p>{project.excerpt}</p>
                  </div>
                ))
              ) : (
                <p>Loading projects...</p>
              )}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Projects;
