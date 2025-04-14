import React from "react";

const Button = ({ children, href }) => {
  const content = children || "Click Me!";

  if (href) {
    return (
      <a
        target="_blank"
        href={href}
        className="bg-primary-400 text-text-50 py-2 px-4 rounded-md hover:bg-primary-300 transition-all inline-block"
      >
        {content}
      </a>
    );
  } else {
    return (
      // ToDo => Do I need javascript click events?
      <button className="bg-primary-400 text-text-50 py-2 px-4 rounded-md hover:bg-primary-300 transition-all">
        {content}
      </button>
    );
  }
};

export default Button;
