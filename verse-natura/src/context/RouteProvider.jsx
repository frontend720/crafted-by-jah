import { useState, createContext } from "react";

const RouteContext = createContext(null);

function RouteProvider({ children }) {
  const [title, setTitle] = useState(null);
  const [poem, setPoem] = useState([]);
  const [error, setError] = useState(null);

  const newPoem = (e) => {
    e.preventDefault();
    fetch(`https://poetrydb.org/title/${title}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 404) {
          setError(
            "Looks like that poem's a mystery. Spelling check, perhaps?"
          );
          setPoem([])
        } else {
          setPoem(data);
          setError("")
        }
      })
      .catch((error) => {
        if (error.reason == "Not found") {
          console.log("error");
        }
      });
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <RouteContext.Provider
      value={{ title, poem, error, onTitleChange, newPoem }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export { RouteContext, RouteProvider };
