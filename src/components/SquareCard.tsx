import React from "react";
import "./SquareCard.css";

type CardProps = {
  title: string;
  description: string;
  image?: string;
};

const SquareCard: React.FC<CardProps> = ({ title, description, image }) => {
  const contentElement = (
      <div className="flex w-full h-full p-4 overflow-hidden shadow-md bg-background-900 bg-gradient-to-tr from-secondary-900 to-primary-800 rounded-3xl">
        <div className="flex items-center justify-center h-full pr-2">
              <img src={image} alt={title} className="h-8"/>
        </div>
        <div className="h-full">
        <b className="text-text-100">{title}</b>
            <p className="text-sm text-text-200">{description}</p>
        </div>
    </div>
  );


  return contentElement;
};

export default SquareCard;
