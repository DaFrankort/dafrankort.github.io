import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="w-full -mb-24 py-16 overflow-hidden h-[40vh]">
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
          <h1>Personal Projects</h1>
          <h2>Programming projects I've created</h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
