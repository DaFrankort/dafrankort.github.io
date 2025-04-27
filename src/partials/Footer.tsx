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
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/daniel-frankort/" target="_blank" rel="noopener noreferrer">
              LinkedIn
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
              Home
            </a>
          </li>
          <li>
            <a href="/#/project" rel="noopener noreferrer">
              Projects
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
