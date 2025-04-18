import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "./partials/Hero";
import { Project } from "../../interfaces";

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProjectData] = useState<Project | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/content/repos/${projectId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => setProjectData(data))
      .catch((err) => setError(err.message));
  }, [projectId]);

  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <Hero project={project} />

      <section className="container">
        <Card title="About" content={project.description}>
          {!project.private && <Button href={project.html_url}>View on GitHub</Button>}
        </Card>
      </section>
    </div>
  );
}

export default ProjectDetail;
