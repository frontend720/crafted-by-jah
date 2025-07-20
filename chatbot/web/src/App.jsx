/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Chat from "./Chat";
import ImageUpload from "./ImageUpload.jsx"
import Navbar from "./Navbar.jsx";
import Settings from "./Settings.jsx";
// axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Navbar />
      {/* <Chat /> */}
      {/* <ImageUpload /> */}
    </div>
  );
}

export default App;
