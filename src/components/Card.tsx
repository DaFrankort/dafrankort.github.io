import React, { ReactNode } from "react";
import { modifyAnchorTags } from "../functions/ModifyAnchorTags";
import "./Card.css";
import { returnRandomFromSeed } from "../functions/ReturnRandomFromSeed";

type CardProps = {
  title?: string;
  image?: string;
  content: ReactNode | string;
  buttons?: ReactNode;
  href?: string;
};

const Card: React.FC<CardProps> = ({ title, image, content, buttons, href }) => {
  const cardClass = href ? "clickable-card" : "card";
  const contentElement = (
    <div className={`${cardClass} group`}>
      {image && (
        <div className="relative w-full h-48">
          <img src={image} alt="Card" className="object-cover w-full h-full" />
          <div className="absolute inset-0 transition-opacity opacity-40 group-hover:opacity-20 bg-gradient-to-t from-primary-950 to-primary-400" />
        </div>
      )}

      <div className="flex flex-col justify-between h-full p-5 text-left">
        <div>
          {title && <h2 className="mb-4 text-xl">{title}</h2>}
          {typeof content === "string" ? (
            <div className="card-content" dangerouslySetInnerHTML={{ __html: modifyAnchorTags(content) }} />
          ) : (
            <div className="mb-4 text-base">{content}</div>
          )}
        </div>
        {buttons && <div className="buttons">{buttons}</div>}
      </div>
    </div>
  );

  if (href) {
    const className = returnRandomFromSeed(href, ["hover:rotate-1", "hover:-rotate-1"]);

    return (
      <a href={href} className={`${className}`} style={{ textDecoration: "none" }}>
        {contentElement}
      </a>
    );
  }

  return contentElement;
};

export default Card;
