import Card from "../../components/Card";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "./partials/Hero";
import { fetchProjectDetail, Project } from "../../functions/FetchProjectDetails";

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProjectData] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    fetchProjectDetail(projectId)
      .then((data) => {
        if (!data) {
          setError("Project not found");
        } else {
          setProjectData(data);
        }
      })
      .catch((err) => setError(err.message));
  }, [projectId]);

  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <Hero project={project} />

      <section className="container">
        <Card
          title="About"
          content={project.description}
          buttons={
            !project.private && (
              <Button href={project.html_url}>
                <i className="mr-1 fa-brands fa-github"></i>
                View on GitHub
              </Button>
            )
          }
        />
      </section>
    </div>
  );
}

export default ProjectDetail;
