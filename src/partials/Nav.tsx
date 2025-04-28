import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Nav.css";

const Nav: React.FC = ({}) => {
  const location = useLocation();
  const buttons: string[] = ["home", ...location.pathname.split("/").filter(Boolean)];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${isScrolled ? "nav-scrolled" : "nav-top"}`}>
      {" "}
      <div className="nav-content">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <span className="nav-divider">
                <i className="scale-75 fa-solid fa-chevron-right"></i>
              </span>
            )}
            <div className="flex items-center uppercase">
              {index === buttons.length - 1 ? (
                <strong className="text-text-100">{button}</strong>
              ) : (
                <a
                  href={button === "home" ? "#/" : `#/${buttons.slice(1, index + 1).join("/")}`}
                  className="ul-fancy nav-button"
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
