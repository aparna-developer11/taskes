import React, { useState } from "react";
import Input from "../Components/input";
import { UserRound, LockKeyhole, UserPen } from "lucide-react";
import SignupImage from "../assets/Signup.png";
import ButtonMedium from "../Components/ButtonMedium";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = () => {
    if (!name || !username || !password || !confirm) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = { name, username, password };
    onSignup(newUser);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="row shadow-lg bg-white rounded overflow-hidden w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* Left side image */}
        <div className="col-md-6 d-none d-md-flex p-0">
          <img
            src={SignupImage}
            alt="Signup"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Right side form */}
        <div className="col-12 col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-center">Sign Up</h2>

          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<UserPen />}
          />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserRound />}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockKeyhole />}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            icon={<LockKeyhole />}
          />

          <div className="d-grid mt-3">
            <ButtonMedium btnName="SignUp" onClick={handleSubmit} />
          </div>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <a
              href="#"
              style={{ textDecoration: "none", color: "#098FDA" }}
              onClick={onSwitchToLogin}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
