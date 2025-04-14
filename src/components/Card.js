import React from "react";

const Card = ({ title, content, image, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 m-5">
      {image && <img src={image} alt="Card" className="w-full h-48 object-cover" />}
      <div className="p-5">
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        <p className="text-gray-700 text-base mb-4">{content}</p>
        {children && <div className="text-sm text-gray-500 text-center">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
