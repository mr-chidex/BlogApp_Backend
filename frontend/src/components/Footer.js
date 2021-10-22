import { Container } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location?.pathname?.split("/")[1] === "dashboard") return null;

  return (
    <footer className="footer">
      <Container maxWidth="lg">Footer</Container>
    </footer>
  );
};

export default Footer;
