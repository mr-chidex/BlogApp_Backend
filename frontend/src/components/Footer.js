import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <small>
            <a
              href="https://twitter.com/mr_chidex"
              target="blank"
              rel="noreferrer noopener"
            >
              @twiiter
            </a>
          </small>
        </li>
        <li>
          <small>
            {" "}
            <a
              href="https://github.com/mr-chidex"
              target="blank"
              rel="noreferrer noopener"
            >
              @github
            </a>
          </small>
        </li>
        <li>
          <small>
            {" "}
            ©{new Date().getFullYear()} Mr-Chidex : Developed by{" "}
            <a
              href="https://github.com/mr-chidex"
              target="blank"
              rel="noreferrer noopener"
            >
              Mr-Chidex
            </a>
          </small>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
