import React from "react";
import "./Hero.css";
import Button from "../../../components/Button";

const Hero: React.FC = ({}) => {
  return (
    <section className="w-full py-16 -mb-20 overflow-hidden h-hero-lg">
      {/* Background */}
      <div className="hero-blobs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="w-full h-hero-lg will-change-transform"
          viewBox="0 0 500 250"
          preserveAspectRatio="xMidYMid slice"
        >
          <g>
            <circle id="blob-1" cx="325" cy="280" r="250" fill="currentColor" />
            <circle id="blob-2" cx="550" cy="140" r="250" fill="currentColor" />
            <circle id="blob-3" cx="50" cy="140" r="250" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="container hero-container">
        <div id="hero-content">
          <h1>Full-Stack Developer</h1>
          <h2>Daniël Frankort</h2>
          <p>Automation Engineer with a passion for programming, music & technology.</p>
          <p>Always on the lookout for new challenges or projects.</p>
          <div className="flex gap-2 pt-2 text-sm">
            <Button href="/#/project">View Projects</Button>
            <Button>Download CV</Button>
            <Button>Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
