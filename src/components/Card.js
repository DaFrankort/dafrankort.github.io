import React from "react";

const Card = ({ title, content, image, children }) => {
  return (
    <div className="bg-background-900 bg-gradient-to-tr from-secondary-900 to-background-900 rounded-2xl shadow-md overflow-hidden w-80 m-5">
      {image && <img src={image} alt="Card" className="w-full h-48 object-cover" />}
      <div className="p-5 text-left">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <p className="text-base mb-4">{content}</p>
        {children && <div className="text-sm text-right">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
