import React from "react";

const Card = ({ title, content, image, children }) => {
  return (
    <div className="m-5 overflow-hidden shadow-md bg-background-900 bg-gradient-to-tr from-secondary-900 to-primary-800 rounded-2xl w-80 group">
      {image && (
        <div className="relative w-full h-48">
          <img src={image} alt="Card" className="object-cover w-full h-full" />
          <div className="absolute inset-0 transition-opacity opacity-40 group-hover:opacity-20 bg-gradient-to-t from-primary-950 to-primary-400" />
        </div>
      )}

      <div className="p-5 text-left">
        {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
        <p className="mb-4 text-base">{content}</p>
        {children && <div className="text-sm text-right">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
