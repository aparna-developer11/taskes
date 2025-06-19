import React from "react";
import "../Css/ButtonLarge.css"; // make sure this file includes .nav-button styles

export const ButtonLarge = ({ onClick, icon, name, className = "" }) => {
  return (
    <button className={`nav-button ${className}`} onClick={onClick}>
      {icon} {name}
    </button>
  );
};
