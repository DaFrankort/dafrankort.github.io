import React from "react";
import "./SquareCard.css";

type CardProps = {
  title: string;
  description: string;
  image?: string;
};

const SquareCard: React.FC<CardProps> = ({ title, description, image }) => {
  const contentElement = (
    <div className="square-card">
      <img src={image} alt={title} className="w-8 h-8 mb-2 drop-shadow-md" />
      <b>{title}</b>
      <p>{description}</p>
    </div>
  );


  return contentElement;
};

export default SquareCard;
