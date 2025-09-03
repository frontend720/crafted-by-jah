import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./ThemeContext.jsx";
import { AxiosContextProvider } from "./AxiosContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AxiosContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AxiosContextProvider>
);
