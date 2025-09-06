import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { AxiosContextProvider } from "./context/AxiosContext.jsx";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AxiosContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AxiosContextProvider>
  </React.StrictMode>
);
