import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Portfolio from "./components/Portfolio";
import SignUp from "./components/SignUp";

export default function App() {
   
    return (
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm /> } />
          <Route path="/logout" element={<Logout />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
    );
}


