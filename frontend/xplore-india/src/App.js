import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Authpages/Login";
import Register from "./Components/Authpages/Register";
import Home from "./Components/Home/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Auth from "./Components/Authpages/Auth";
import LandingPage from "./Components/Landing Page/LandingPage";
export const UserContext = createContext();
function App() {
  const [userContext, setUserContext] = React.useState({
    isLoggedIn: false,
    userID: "",
  });
  return (
    <>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/place" element={<LandingPage />}>
              <Route path=":placeID" element={<Login />} />
            </Route>
            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}
export default App;
