import React from "react";
import "./Footer.css";

const Footer: React.FC = ({}) => {
  return (
    <footer>
      <div className="container footer-content">
        <ul id="footer-left">
          <li>
            <b className="text-background-500">Social</b>
          </li>
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

        <div id="footer-center">
          <p className="">© 2025 Daniël Frankort. All rights reserved.</p>
        </div>

        <ul id="footer-right" className="text-right">
          <li>
            <b className="text-background-500">Navigate</b>
          </li>
          <li>
            <a href="/" rel="noopener noreferrer">
              Home<i className="ml-1 fa-solid fa-house"></i>
            </a>
          </li>
          <li>
            <a href="/#/project" rel="noopener noreferrer">
              Projects<i className="ml-1 fa-solid fa-folder-tree"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
