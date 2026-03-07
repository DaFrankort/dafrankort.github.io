import React from "react";
import "./SquareCard.css";

type CardProps = {
  title: string;
  description: string;
  iconClasses: string;
};

const SquareCard: React.FC<CardProps> = ({ title, description, iconClasses }) => {
  const contentElement = (
    <div className="square-card">
      <div className="mb-1 text-4xl text-white drop-shadow-md">
        <i className={iconClasses}></i>
      </div>
      <b>{title}</b>
      <p>{description}</p>
    </div>
  );


  return contentElement;
};

export default SquareCard;
