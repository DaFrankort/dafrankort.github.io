import React from "react";
import "./Hero.css";

const Hero: React.FC = ({}) => {
  return (
    <section className="w-full -mb-20 py-16 overflow-hidden h-[960px]">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden bg-gradient-to-tr from-black to-background-800 opacity-20 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="w-full h-[960px] will-change-transform"
          viewBox="0 0 500 250"
          preserveAspectRatio="xMidYMid slice"
        >
          <g>
            <circle id="blob-1" cx="250" cy="280" r="250" fill="currentColor" />
            <circle id="blob-2" cx="500" cy="140" r="250" fill="currentColor" />
            <circle id="blob-3" cx="0" cy="140" r="250" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="container flex items-center justify-between h-full -mt-20">
        <div id="hero-left">
          <h1 className="mb-2 text-7xl">Full-Stack Developer</h1>
          <h2 className="mb-8 text-5xl text-transparent bg-clip-text bg-gradient-to-l from-primary-500 to-primary-200">
            Daniël Frankort
          </h2>
          <p>
            A diligent programmer with a strong focus on self-growth and continuous improvement. My background inthe
            automation sector has provided me with valuableexperience in solution-oriented thinking, project-basedwork,
            meeting deadlines, and effective teamwork. My core values include clear communication, writing clean and
            maintainable code, and fostering growth in both my skills and those of my team.
          </p>
        </div>

        <div id="hero-right">Placeholder</div>
      </div>
    </section>
  );
};

export default Hero;
