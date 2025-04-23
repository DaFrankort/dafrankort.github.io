import Card from "../../components/Card";
import Button from "../../components/Button";
import Hero from "./partials/Hero";

function Home() {
  return (
    <div className="text-center">
      <Hero />

      <div className="space-y-8">
        <section className="container">
          <Card
            title="Check out my projects!"
            content="This website is currently a work-in-progress, however I have a few basic projects that can be seen here."
            buttons={
              <div className="button-list">
                <Button href="/#/project">My Projects</Button>
              </div>
            }
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
