import { Container } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location?.pathname?.split("/")[1] === "dashboard") return null;

  return (
    <footer style={{
      height: "10rem",
      display: "grid",
      placeItems: "center",
      background: "#111"
    }} className="footer">
       <div style={{ textAlign: "center" }}>
        All right reserved | Designed by @
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="http://github.com/mr-chidex"
        >
          Mr-Chidex
        </a>
      </div>
    </footer>
  );
};

export default Footer;
