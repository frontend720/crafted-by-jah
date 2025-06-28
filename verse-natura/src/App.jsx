import { useContext } from "react";
import "./App.css";
import { RouteContext } from "./context/RouteProvider.jsx"
import { AiOutlineSearch } from "react-icons/ai";
import Poem from "./Poems.jsx";

function App() {
  const { title, poem, error, onTitleChange, newPoem } =
    useContext(RouteContext);
  console.log(poem.map((poem) => poem));

  return (
 <div className="container">
 <Poem />
 </div>
  );
}

export default App;
