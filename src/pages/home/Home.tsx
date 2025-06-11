import Card from "../../components/Card";
import Hero from "./partials/Hero";
import { useEffect, useState } from "react";
import { fetchIndex, IndexProject } from "../../functions/FetchIndex";
import ProjectCard from "./partials/ProjectCard";

function Home() {
  const [projects, setProjects] = useState<IndexProject[]>([]);

  useEffect(() => {
    fetchIndex().then(setProjects);
  }, []);

  return (
    <div className="text-center">
      <Hero />

      <div className="space-y-8">
        <section className="container">
          <Card
            title="GitHub Projects"
            content={
              <div>
                <p className="mb-4">
                  I have some projects you can read a little more about, although information is a little bit dated as
                  for now!
                </p>
                <div className="card-list">
                  {projects.length > 0 ? (
                    projects.map((project) => <ProjectCard project={project} />)
                  ) : (
                    <Progress value={null} />
                  )}
                </div>
              </div>
            }
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
