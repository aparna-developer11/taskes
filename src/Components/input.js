import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const Input = ({ type, placeholder, value, onChange, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => setShowPassword(!showPassword);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type || "text";

  return (
    <div className="position-relative mb-3 w-100" style={{ maxWidth: "300px" }}>
      {/* Icon */}
      <span
        className="position-absolute top-50 translate-middle-y ps-2"
        style={{ zIndex: 1 }}
      >
        {icon}
      </span>

      {/* Input */}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control ps-5 py-2 rounded-3 border border-dark"
      />

      {/* Password toggle */}
      {type === "password" && (
        <button
          type="button"
          className="position-absolute top-50 translate-middle-y end-0 pe-3 bg-transparent border-0"
          onClick={toggle}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
