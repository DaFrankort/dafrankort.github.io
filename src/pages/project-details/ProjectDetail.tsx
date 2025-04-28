import Card from "../../components/Card";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "./partials/Hero";
import { fetchProjectDetail, Project } from "../../functions/FetchProjectDetails";

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProjectData] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;

    fetchProjectDetail(projectId)
      .then((data) => {
        if (!data) {
          setError(`Project '${projectId}' not found.`);
        } else {
          setProjectData(data);
        }
      })
      .catch((err) => {
        setError(err.message);
        navigate("/#/project");
      });
  }, [projectId]);

  if (error)
    return (
      <div className="flex justify-center items-center w-full h-[50vh]">
        <div className="space-y-4 text-center">
          <p className="text-3xl text-accent-100">{error}</p>
          <Button href="/#/project">Browse other Projects</Button>
        </div>
      </div>
    );
  if (!project) return <div className="flex justify-center items-center w-full h-[50vh] text-3xl">Loading...</div>;

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
