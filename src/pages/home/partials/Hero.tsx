import React, { useEffect, useRef, useState } from "react";
import KUTE from "kute.js";
import "./Hero.css";

const Hero: React.FC = ({}) => {
  useEffect(() => {
    // TODO: This is too slow (and overkill), use a CSS solution instead!
    let tweens = [];

    for (let i = 0; i < 3; i++) {
      const pathA = document.getElementById(`blob-a${i}`);
      const pathB = document.getElementById(`blob-b${i}`);
      if (pathA && pathB) {
        KUTE.fromTo(
          pathA,
          { path: pathA },
          { path: pathB },
          {
            repeat: 999,
            duration: 12000,
            yoyo: true,
            easing: "easingCubicInOut",
          }
        ).start();
      }
    }
  }, []);

  return (
    <section className="w-full -mb-20 py-16 overflow-hidden h-[960px]">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden bg-gradient-to-tr from-black to-background-800 opacity-20 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="w-full h-[960px] will-change-transform opacity-50"
          viewBox="0 0 720 480"
          preserveAspectRatio="xMidYMid slice"
        >
          <g className="lg:blur-lg sm:blur-2xl blur-xl">
            <path
              d="M173,459a363,363 0 1,0 726,0a363,363 0 1,0 -726,0"
              fill="currentColor"
              id="blob-a0"
              className="text-primary-900 md:text-primary-700"
            />
            <path
              d="M527,138a363,363 0 1,0 726,0a363,363 0 1,0 -726,0"
              fill="currentColor"
              id="blob-a1"
              className="md:scale-75 text-secondary-800"
            />
            <path
              d="M38,128a363,363 0 1,0 726,0a363,363 0 1,0 -726,0"
              fill="currentColor"
              id="blob-a2"
              className="md:scale-50 text-primary-600"
            />
          </g>

          <g style={{ visibility: "hidden" }}>
            <path d="M-125,185a363,363 0 1,0 726,0a363,363 0 1,0 -726,0" id="blob-b0" />
            <path d="M125,186a363,363 0 1,0 726,0a363,363 0 1,0 -726,0" id="blob-b1" />
            <path d="M511,28a363,363 0 1,0 726,0a363,363 0 1,0 -726,0" id="blob-b2" />
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
