import React from "react";
import "./NoMatch.css";
import logo from "../assets/images/logo.png";

function NoMatch() {
  return (
    <div className="NoMatch">
      <img src={logo}></img>
      <h2>Esta página no existe</h2>
    </div>
  );
}

export default NoMatch;
