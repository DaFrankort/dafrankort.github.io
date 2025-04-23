import React, { ReactNode } from "react";
import { modifyAnchorTags } from "../functions/ModifyAnchorTags";
import "./Card.css";

type CardProps = {
  title: string;
  image?: string;
  content: ReactNode | string;
  buttons?: ReactNode;
};

const Card: React.FC<CardProps> = ({ title, image, content, buttons }) => {
  return (
    <div className="card group">
      {image && (
        <div className="relative w-full h-48">
          <img src={image} alt="Card" className="object-cover w-full h-full" />
          <div className="absolute inset-0 transition-opacity opacity-40 group-hover:opacity-20 bg-gradient-to-t from-primary-950 to-primary-400" />
        </div>
      )}

      <div className="p-5 text-left">
        {title && <h2 className="mb-4 text-xl">{title}</h2>}
        {typeof content === "string" ? (
          <div className="card-content" dangerouslySetInnerHTML={{ __html: modifyAnchorTags(content) }} />
        ) : (
          <div className="mb-4 text-base">{content}</div>
        )}
        {buttons && <div className="buttons">{buttons}</div>}
      </div>
    </div>
  );
};

export default Card;
