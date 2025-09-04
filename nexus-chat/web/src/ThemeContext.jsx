import {createContext, useEffect, useState} from "react"

const ThemeContext = createContext()

function ThemeContextProvider({children}){

  const themes = [
  {
    name: "Soft Sky Blue",
    gradient: "linear-gradient(to bottom, #f0f4f8, #e0e7f0)",
  },
  {
    name: "Gentle Rose & Cream",
    gradient: "linear-gradient(to bottom, #fdf5f5, #f5f0f5)",
  },
  {
    name: "Mint & White",
    gradient: "linear-gradient(to bottom, #f5fcf9, #eaf5f0)",
  },
  {
    name: "Lavender Dream",
    gradient: "linear-gradient(to bottom, #f9f6ff, #eef1ff)",
  },
  {
    name: "Golden Hour",
    gradient: "linear-gradient(to bottom, #fff7e6, #f7e6c4)",
  },
  {
    name: "Deep Midnight Blue",
    gradient: "linear-gradient(to bottom, #1a2a3a, #0d121c)",
  },
  {
    name: "Twilight Ocean",
    gradient: "linear-gradient(to bottom, #132731, #0a171d)",
  },
  {
    name: "Cosmic Dust",
    gradient: "linear-gradient(to bottom, #2b2b41, #1e1e2d)",
  },
  {
    name: "Smoked Plum",
    gradient: "linear-gradient(to bottom, #211c2b, #15111b)",
  },
  {
    name: "Deep Forest",
    gradient: "linear-gradient(to bottom, #192a2a, #0d1212)",
  },
];

  const [themeIndex, setThemeIndex] = useState(0);
  const [localTheme, setLocalTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if(savedTheme){
        const parsedTheme = JSON.parse(savedTheme);
        const index = themes.findIndex(theme => theme.gradient === parsedTheme);
        return index !== -1 ? index : 0;
      }
    } catch (error) {
      console.log("Unable to retrieve saved thehe", error);
    }
    return 0;
  });

  useEffect(() => {
    setThemeIndex(localTheme)
  }, [localTheme])

  // console.log(themes[themeIndex].gradient)

  useEffect(() => {
    try {
      const currentTheme =themes[themeIndex].gradient
      localStorage.setItem("theme", JSON.stringify(currentTheme));
      // console.log(`Succesfully added ${themes[themeIndex].gradient} to localStorage`);
    } catch (error) {
      console.log(error);
    }
  }, [themeIndex]);

    function onThemeChange() {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  }
    return(
        <ThemeContext.Provider value={{localTheme, onThemeChange, themes, themeIndex}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}