// Import methods from libraries
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import styles
import "./App.css";

// Import components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Footer from "../Footer/Footer";

// Import popups

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <About />
      <Footer />
    </div>
  );
}

export default App;
