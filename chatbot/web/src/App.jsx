/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Chat from "./Chat";
import ImageUpload from "./ImageUpload.jsx"

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

function App() {

  return (
    <div>
      <Chat />
      {/* <ImageUpload /> */}
    </div>
  );
}

export default App;
