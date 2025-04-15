import React, { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
};

const Button: React.FC<ButtonProps> = ({ children, href }) => {
  const content = children || "Click Me!";

  if (href) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="inline-block px-4 py-2 transition-all text-text-100 bg-secondary-500 hover:bg-secondary-400 hover:text-text-50 hover:rotate-1 rounded-3xl"
      >
        {content}
      </a>
    );
  }

  return (
    <button className="inline-block px-4 py-2 transition-all bg-secondary-500 hover:bg-secondary-400 hover:text-text-50 hover:rotate-1 rounded-3xl">
      {content}
      <div>PLACEHOLDER</div>
    </button>
  );
};

export default Button;
