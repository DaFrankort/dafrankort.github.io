import Card from "../../components/Card";
import Button from "../../components/Button";
import Hero from "./partials/Hero";
import { fetchIndexTechstacks } from "../../functions/FetchIndex";
import Chip from "../../components/Chip";
import { useEffect, useState } from "react";

function Home() {
  const [techstacks, setTechstacks] = useState<string[]>([]);

  useEffect(() => {
    fetchIndexTechstacks().then(setTechstacks);
  }, []);

  return (
    <div className="text-center">
      <Hero />

      <div className="space-y-8">
        <section className="container" id="about-me">
          <Card
            title="About me"
            content={
              <div>
                <p>
                  I am driven by a passion to create, whether it's music, video, technology or software development.
                </p>
                <p>
                  With previous experience as an industrial automation engineer, I have gained valuable experience with
                  project deadlines, cross-functional teamwork and problem-solving.
                </p>
                <p>
                  I'm constantly learning and evolving, and I take pride in inspiring growth and collaboration within a
                  team.
                </p>
              </div>
            }
            buttons={
              <div className="button-list">
                <Button href="/#/project">See my projects</Button>
              </div>
            }
          />
        </section>

        <section className="container" id="skills">
          <Card
            title="My skills"
            content={
              <div>
                <p>
                  I'm constantly looking to learn new languages and frameworks, here are frameworks I have actively
                  used.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {techstacks.map((techstack) => (
                    <Chip key={techstack} text={techstack} />
                  ))}
                </div>
              </div>
            }
          />
        </section>

        <section className="container" id="featured-projects">
          <Card
            title="Featured Projects"
            content={
              <div>
                <p>Here are a few software projects I've developed</p>
                <p>
                  <strong>TODO: Show 3 interesting ones from index.json?</strong>
                </p>
              </div>
            }
          />
        </section>

        <section className="container" id="contact-me">
          <Card
            title="Contact me"
            content={
              <div>
                <p>
                  Feel free to reach out to me through{" "}
                  <a
                    href="https://www.linkedin.com/in/daniel-frankort/"
                    target="_blank"
                    className="ul-fancy !text-text-50 italic"
                  >
                    LinkedIn.
                  </a>
                </p>
                <p>
                  Additionally feel free to look at my{" "}
                  <a href="https://github.com/DaFrankort" target="_blank" className="ul-fancy !text-text-50 italic">
                    GitHub.
                  </a>
                </p>
              </div>
            }
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
