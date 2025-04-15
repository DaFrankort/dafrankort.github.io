import React from "react";
import Card from "./components/Card";
import Button from "./components/Button";

function App() {
  return (
    <div className="mt-10 text-center">
      <header className="section">
        <h1 className="mb-6 text-4xl font-bold">Lorem Ipsum</h1>
      </header>

      <section className="grid-lg section">
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

        <Card title="Card 2" content="Here is another card with some different content. You can pass any content here.">
          <Button href="https://github.com/DaFrankort">Visit my super cool site!</Button>
        </Card>
      </section>
    </div>
  );
}

export default App;
