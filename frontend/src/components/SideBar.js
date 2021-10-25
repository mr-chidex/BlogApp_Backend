import React from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const SideBar = () => {
  return (
    <div className="side-bar">
      <h1>Latest </h1>
      {[...Array(6)].map((_, index) => (
        <Link key={index} to="/" p>
          <p>
            <ArrowRightIcon className="arrow" />
            dolor sit amet consectetur adipisicing elit. Quaerat modi quibusdam,
            ipsum voluptas, repellat incidunt quae ex delectus error similique
            blanditiis nequ
          </p>
        </Link>
      ))}

      <div className="search-bar"></div>

      <h1>Spotlight</h1>
      {[...Array(4)].map((_, index) => (
        <Link key={index} to="/">
          <p>
            <ArrowRightIcon className="arrow" />
            dolor sit amet consectetur adipisicing elit. Quaerat modi quibusdam,
            ipsum voluptas, repellat incidunt quae ex delectus error similique
            blanditiis nequ
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
