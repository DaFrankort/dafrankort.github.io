import React, { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
};

const Button: React.FC<ButtonProps> = ({ children, href }) => {
  const content = children || "Click Me!";

  if (href) {
    const target = href.startsWith("/") ? "_self" : "_blank";

    return (
      <a target={target} rel="noopener noreferrer" href={href} className="button">
        {content}
      </a>
    );
  }

  return (
    <button className="button">
      {content}
      <div>PLACEHOLDER</div>
    </button>
  );
};

export default Button;
