import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.log("Unable to retrieve saved theme!", error);
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", JSON.stringify(theme));
    } catch (error) {
      console.log("Unable to save theme", error);
    }
  }, [theme]);

  function onThemeChange() {
    setTheme((prev) => !prev);
  }

  const [degrees, setDegrees] = useState(0);


  useEffect(() => {
  let animationFrameId;
  let frameCount = 0;

  const animate = () => {
    frameCount++;
    if (frameCount % 4 === 0) {
      setDegrees((prev) => (prev + 1) % 360);
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrameId);
}, []);
  return (
    <ThemeContext.Provider value={{ theme, onThemeChange, degrees }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
