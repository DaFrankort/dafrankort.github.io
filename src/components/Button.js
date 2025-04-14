import React from "react";

const Button = ({ children, href }) => {
  const content = children || "Click Me!";

  // Anchor button
  if (href) {
    return (
      <a
        target="_blank"
        href={href}
        className="bg-secondary-500 hover:bg-secondary-400 hover:text-text-50 hover:rotate-1 py-2 px-4 rounded-3xl transition-all inline-block"
      >
        {content}
      </a>
    );
  }

  // Default button
  return (
    // ToDo => Do I need javascript click events?
    <button className="bg-secondary-500 hover:bg-secondary-400 hover:text-text-50 hover:rotate-1 py-2 px-4 rounded-3xl transition-all inline-block">
      {content}
      <div>PLACEHOLDER</div>
    </button>
  );
};

export default Button;
