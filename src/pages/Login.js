import React, { useState } from "react";
import { UserRound, LockKeyhole } from "lucide-react";
import LoginImage from "../assets/loginImg.png";
import Input from "../Components/input";
import ButtonMedium from "../Components/ButtonMedium";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="row shadow-lg bg-white rounded overflow-hidden w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* Left Form */}
        <div className="col-12 col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-center">Login</h2>

          <Input
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserRound />}
          />

          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockKeyhole />}
          />

          <div className="d-grid mt-3">
            <ButtonMedium
              btnName="Login"
              onClick={() => onLogin(username, password)}
            />
          </div>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <a
              href="#"
              style={{ textDecoration: "none", color: "#098FDA" }}
              onClick={onSwitchToSignup}
            >
              Create One
            </a>
          </p>
        </div>

        {/* Right Image */}
        <div className="col-md-6 d-none d-md-flex p-0">
          <img
            src={LoginImage}
            alt="Login"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
