import React, { ReactNode } from "react";
import "./Footer.css";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 pt-6 pb-3 mt-8 bg-gradient-to-tr from-black to-background-950 text-background-600">
      <div className="grid grid-cols-2 text-sm section">
        <ul id="footer-left">
          <li>
            <b className="text-background-400">Social Media</b>
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

        <ul id="footer-right" className="text-right">
          <li>
            <b className="text-background-400">Navigate</b>
          </li>
          <li>
            <a href="/" rel="noopener noreferrer">
              Home
            </a>
          </li>
        </ul>
      </div>

      <div className="flex justify-center w-full">
        <p className="text-xs text-background-700">© 2025 Daniël Frankort. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
