import React from "react";
import "./Footer.css";

const Footer: React.FC = ({ }) => {
  return (
    <footer>
      <div className="container footer-content">
        <div id="footer-center flex">
          <ul className="flex justify-center gap-4 text-background-300">
            <li>
              <a href="https://github.com/DaFrankort" target="_blank" rel="noopener noreferrer">
                <i className="mr-1 fa-brands fa-github"></i>GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/daniel-frankort/" target="_blank" rel="noopener noreferrer">
                <i className="mr-1 fa-brands fa-linkedin"></i>LinkedIn
              </a>
            </li>
          </ul>
          <p className="w-full text-xs text-center text-background-700">© {new Date().getFullYear()} Daniël Frankort.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
