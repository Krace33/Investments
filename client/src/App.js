import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import SignUp from "./pages/SignUp";
import { UserContext } from "./utilities/userContext";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Investment from "./pages/Investments";

export default function App() {

  const [data, setData] = useState({
    'user': null,
    'investments': null,
    'portfolios': null
  });

  const value = useMemo(() => ([data, setData]), [data, setData]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Navbar>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
              </Routes>
            </div>
          </div>
        </Navbar>
        
    {/* <div className="auth-wrapper">
      <div className="auth-inner"> */}
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route
                path="/portfolio/:portfolioName"
                element={<Investment />}
              />
            </Routes>
      </UserContext.Provider>
    </Router>
  );
}


