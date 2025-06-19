import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  document.title = "To Do Manager";

  // Load users from localStorage or use default list
  const initialUsers = JSON.parse(localStorage.getItem("userData")) || [
    { name: "Admin", username: "admin123", password: "Admin123" },
  ];

  const [data, setData] = useState(initialUsers);
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  const handleSignup = (newUser) => {
    if (data.some((u) => u.username === newUser.username)) {
      alert("Username already exists!");
      return;
    }
    setData([...data, newUser]);
    setPage("login");
  };

  const handleLogin = (username, password) => {
    const user = data.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setPage("dashboard");
    } else {
      alert("Invalid user");
    }
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setPage("signup")}
        />
      )}
      {page === "signup" && (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setPage("login")}
        />
      )}
      {page === "dashboard" && (
        <Dashboard user={currentUser} onLogout={() => setPage("login")} />
      )}
    </>
  );
};

export default App;
