import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

function Projects() {
  return (
    <div className="text-center">
      <div className="space-y-8">
        <section className="container">
          <Card
            title="Check out my projects!"
            content="I have many projects you can see on this website, feel free to take a look around!"
          >
            <div className="button-list">
              <Button href="https://github.com/DaFrankort">Java</Button>
              <Button href="https://github.com/DaFrankort">Python</Button>
              <Button href="https://github.com/DaFrankort">Typescript</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Projects;
