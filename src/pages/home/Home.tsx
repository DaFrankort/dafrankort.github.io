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
            content="I have many projects you can see on this website, feel free to take a look around!"
          >
            <div className="button-list">
              <Button href="https://github.com/DaFrankort">Java</Button>
              <Button href="https://github.com/DaFrankort">Python</Button>
              <Button href="https://github.com/DaFrankort">Typescript</Button>
            </div>
          </Card>
        </section>

        <section className="container grid-lg">
          <Card
            title="Card 1"
            content="This is the content of the first card. It can be a short description or any other content."
            image="https://placehold.co/400x400"
          />

          <Card
            title="Card 1"
            content="This is the content of the first card. It can be a short description or any other content."
            image="https://placehold.co/50x400"
          />

          <Card
            title="Card 2"
            content="Here is another card with some different content. You can pass any content here."
          >
            <Button href="https://github.com/DaFrankort">Visit my super cool site!</Button>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Home;
