/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Chat from "./Chat";
import ImageUpload from "./ImageUpload.jsx"
import Navbar from "./Navbar.jsx";
import Settings from "./Settings.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import Authentication from "./Authentication.jsx";
import { AuthContext } from "./AuthContext.jsx";
// axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

function App() {

  const {theme} = useContext(ThemeContext)
  const {authObj} = useContext(AuthContext)

  return (
    <div style={theme ? {background: "#333333"} : {background: "#ffffff"}}>
      {/* <Routes>
        <Route index element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
      </Routes> */}
      {authObj === null ? <Authentication /> : <Chat />}
      {/* <Authentication /> */}
      {/* <Navbar /> */}
      {/* <Chat /> */}
      {/* <ImageUpload /> */}
    </div>
  );
}

export default App;
