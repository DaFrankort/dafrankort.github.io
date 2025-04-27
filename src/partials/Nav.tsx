import React from "react";
import { useLocation } from "react-router-dom";

const Nav: React.FC = ({}) => {
  const location = useLocation();
  const buttons: string[] = ["home", ...location.pathname.split("/").filter(Boolean)];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 transition-all bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center h-full gap-1 px-4 mx-auto sm:px-6 lg:px-8">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className="font-bold text-white select-none">/</span>}
            <div className="flex items-center uppercase">
              {index === buttons.length - 1 ? (
                <strong className="text-text-100">{button}</strong>
              ) : (
                <a
                  href={button === "home" ? "#/" : `#/${buttons.slice(1, index + 1).join("/")}`}
                  className="transition-colors text-text-200 hover:text-text-50 hover:underline"
                >
                  {button}
                </a>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
