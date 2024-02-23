import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";
const Login = () => {
  const { setUserContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const [message, setMessage] = React.useState("");
  const [className, setClassName] = useState("");
  async function handleLogin(event) {
    event.preventDefault();
    const { email, password } = formData;
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const response = await res.json();
      if (res.status === 200) {
        setClassName("success");
        setUserContext({ userID: response.userID, isLoggedIn: true });
        navigate("/", { replace: true });
      } else {
        setClassName("failure");
      }
      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h3 className="auth-title">Login</h3>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className={`message ${className}`}>{message}</div>
        <input
          className="auth-input"
          placeholder="Email Address"
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="auth-button" type="submit">
          Login
        </button>
        <button
          className="auth-button"
          onClick={() => {
            navigate("/Auth/Register", { replace: true });
          }}
        >
          New User! Register
        </button>
      </form>
    </>
  );
};

export default Login;
