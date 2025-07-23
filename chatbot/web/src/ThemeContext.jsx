import React, { useEffect, useState } from "react";

const ThemeContext = React.createContext();
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? JSON.parse(savedTheme) : false
    } catch (error) {
      console.log("Unable to retrieve theme" + error);
      return false
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    console.log(`Successfully retrieved ${theme ? "light" : "dark"} theme`);
  }, [theme]);

  function onThemeChange() {
    setTheme((prev) => !prev);
  }

  localStorage.setItem("theme", JSON.stringify(theme));
  const retrieveTheme = localStorage.getItem("theme");
  const retrievedTheme = JSON.parse(retrieveTheme);

  console.log(retrievedTheme);

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
