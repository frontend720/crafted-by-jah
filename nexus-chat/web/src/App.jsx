import { useState } from "react";
import ChatContainer from "./ChatContainer";
import ImageContainer from "./ImageContainer";
import ProfileContainer from "./ProfileContainer";
import "./App.css";
import Navbar from "./Navbar";

function App() {

  const [activeScreen, setActiveScreen] = useState("home");

  function renderScreen() {
    switch (activeScreen) {
      case "home":
        return <ChatContainer />;
      case "images":
        return <ImageContainer />;
      case "profile":
        return <ProfileContainer />;
        default:
          return <ChatContainer />
    }
  }
  return (
    <>
      
      {renderScreen()}
    
      <Navbar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </>
  );
}

export default App;
