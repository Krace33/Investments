import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import SignUp from "./components/SignUp";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App() {
   
    return (
      <Router>
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    );
}


