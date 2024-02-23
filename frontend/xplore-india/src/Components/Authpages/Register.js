import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [className, setClassName] = useState("");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnf_password: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const { firstName, lastName, email, password, cnf_password } = formData;
    if (password.length < 9) {
      setClassName("warning");
      setMessage("Password Length Should be Greater Than 8");
      return;
    } else if (password !== cnf_password) {
      setClassName("warning");
      setMessage("Password and Confirm Password Mismatch!");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const response = await res.json();
      if (res.status === 200) {
        setClassName("success");
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
      <h3 className="auth-title">Register</h3>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className={`message ${className}`}>{message}</div>

        <div className="split-input">
          <input
            className="auth-input"
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
            value={formData.firstName}
            autoFocus
          />
          <input
            className="auth-input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          className="auth-input"
          placeholder="Email Address"
          name="email"
          type="email"
          required
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
        <input
          className="auth-input"
          type="password"
          placeholder="Confirm Password"
          name="cnf_password"
          value={formData.cnf_password}
          onChange={handleChange}
          required
        />
        <button className="auth-button" type="submit">
          Register
        </button>
        <button
          className="auth-button"
          onClick={() => {
            navigate("/Auth/Login", { replace: true });
          }}
        >
          Already Registered!
        </button>
      </form>
    </>
  );
};

export default Register;
