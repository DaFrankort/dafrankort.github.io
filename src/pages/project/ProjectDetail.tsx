import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Project = {
  name: string;
  display_name: string;
  excerpt: string;
  description: string;
  html_url: string;
  private: boolean;
  hidden: boolean;
};

function ProjectDetail() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState<Project | null>(null);
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
  if (!projectData) return <div>Loading...</div>;

  return (
    <div className="px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="container">
          <Card title={projectData.display_name} content={projectData.excerpt}>
            <div className="my-4 text-sm text-left">
              <p>{projectData.description}</p>
            </div>
            {!projectData.private && (
              <div className="flex flex-wrap justify-center gap-4 mt-6 button-list">
                <Button href={projectData.html_url}>View on GitHub</Button>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}

export default ProjectDetail;
