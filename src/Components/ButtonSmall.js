import React from "react";

export const ButtonSmall = ({ name, onClick, className = "" }) => {
  return (
    <button
      className={`btn px-2 py-1 text-white rounded-3 ${className}`}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#FF6767",
        border: "none",
        zIndex: 50,
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
