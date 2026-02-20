import Card from "../../components/Card";
import Hero from "./partials/Hero";
import { useEffect, useState } from "react";
import { fetchIndex, IndexProject } from "../../functions/FetchIndex";
import ProjectCard from "./partials/ProjectCard";
import SquareCard from "../../components/SquareCard";

function Home() {
  const [projects, setProjects] = useState<IndexProject[]>([]);

  useEffect(() => {
    fetchIndex().then(setProjects);
  }, []);

  return (
    <div className="text-center">
      <Hero />

      <div className="space-y-8 transition-transform translate-y-0 lg:-translate-y-4">
        <section className="container space-y-12">
          <Card title="My Stack" content={
            <div className="py-4 square-card-list">
              <SquareCard title="C# / .NET" description="Backend architecture & Game dev" image="https://img.icons8.com/ios_filled/512/FFFFFF/c-sharp-logo.png" />
              <SquareCard title="Python" description="Automation & Rapid prototyping" image="https://img.icons8.com/ios_filled/512/FFFFFF/python.png" />
              <SquareCard title="Typescript" description="Type-safe web development" image="https://img.icons8.com/?size=100&id=cHBUT9SmrD2V&format=png&color=FFFFFF" />
              <SquareCard title="TailwindCSS" description="Modern utility-first styling" image="https://img.icons8.com/?size=100&id=4uzTHMgfQhQq&format=png&color=FFFFFF" />
              <SquareCard title="GitHub" description="Version control & CI/CD" image="https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF" />
              <SquareCard title="Docker" description="Containerization & Deployment" image="https://img.icons8.com/?size=100&id=22801&format=png&color=FFFFFF" />
            </div>
          } />

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
                    <p>Loading Projects...</p>
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
