import React, { ReactNode } from "react";
import "./Footer.css";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 hidden pt-4 pb-4 md:inline bg-gradient-to-tr from-black to-background-950 text-background-600">
      <div className="container flex justify-between text-sm">
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
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
