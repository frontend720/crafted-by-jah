import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContextProvider } from "./ThemeContext.jsx";
import { AuthContextProvider } from "./AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { ChatContext } from "./ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <ChatContext>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </ThemeContextProvider>
  </ChatContext>
);
