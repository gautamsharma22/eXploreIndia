import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
