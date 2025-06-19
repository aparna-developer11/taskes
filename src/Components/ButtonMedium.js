import React from "react";

const ButtonMedium = (props) => {
  return (
    <button
      className={`btn btn-danger px-4 py-2 fs-5 rounded-3 w-50 ${
        props.disabled ? "opacity-50" : ""
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
      style={{
        backgroundColor: "#FF9090",
        border: "none",
        opacity: props.disabled ? 0.5 : 1,
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
    >
      {props.btnName}
    </button>
  );
};

export default ButtonMedium;
