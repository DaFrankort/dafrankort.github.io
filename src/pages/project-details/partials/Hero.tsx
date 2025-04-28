import React from "react";
import "./Hero.css";
import { Project } from "../../../functions/FetchProjectDetails";
import Chip from "../../../components/Chip";

interface HeroProps {
  project: Project;
}

const Hero: React.FC<HeroProps> = ({ project }) => {
  return (
    <section className="w-full -mb-16 py-16 overflow-hidden h-[40vh] mt-10 sm:mt-0 sm:-mb-24">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden bg-gradient-to-tr from-black to-background-800 opacity-20 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="w-full h-[40vh] will-change-transform"
          viewBox="0 0 500 250"
          preserveAspectRatio="xMidYMid slice"
        >
          <g>
            <circle id="blob-1" cx="300" cy="280" r="250" fill="currentColor" />
            <circle id="blob-2" cx="525" cy="140" r="250" fill="currentColor" />
            <circle id="blob-3" cx="25" cy="140" r="250" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="container flex items-center justify-between h-full -mt-8">
        <div id="hero-content">
          <h1>{project.display_name}</h1>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.techstack.map((techstack) => (
              <Chip text={techstack} />
            ))}
          </div>

          {!project.private && (
            <a href={project.html_url} className="mt-1.5 ul-fancy" target="_blank">
              <i className="ml-0.5 mr-1 fa-brands fa-github"></i>
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
