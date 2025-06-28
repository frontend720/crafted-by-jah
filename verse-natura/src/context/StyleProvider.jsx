import {useState, createContext} from "react"

const StyleContext = createContext()

function StyleProvider({children}){

    const [theme, setTheme] = useState(false)
    const [font, setFont] = useState(false)

    function onThemeChange(){
        setTheme((prev) => !prev)
    }

    function onFontChange(){
        setFont((prev) => !prev)
    }
 return(
    <StyleContext.Provider value={{theme, font, onThemeChange, onFontChange}}>
        {children}
    </StyleContext.Provider>
 )
}

export {StyleContext, StyleProvider}