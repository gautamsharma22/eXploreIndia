import { useState, useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./navStyle.css";

const Navbar = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const { isLoggedIn } = userContext;
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleLogout = () => {
    setUserContext({ userID: "", isLoggedIn: false });
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h2>eXplore India</h2>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <h1>{!showNavbar ? "Menu" : "Close"}</h1>
        </div>
        <div
          className={`nav-elements  ${showNavbar && "active"}`}
          onClick={handleShowNavbar}
        >
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to="/Auth/login">Login</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/Auth/register">Register</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
