import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ setIsAuthenticated }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log(user, password);
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          user,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Login successful");
        setToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setErrors({ form: "Invalid credentials, please try again." });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ form: "An error occurred, please try again later." });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user") setUser(value);
    else if (name === "password") setPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!user) errors.user = "User is required.";
    if (!password) errors.password = "Password is required.";
    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="user" className="input-label">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              className={`input-field ${errors.user ? "input-error" : ""}`}
              value={user}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
            {errors.user && (
              <span className="error-message">{errors.user}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`input-field ${errors.password ? "input-error" : ""}`}
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          {errors.form && <div className="error-message">{errors.form}</div>}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
