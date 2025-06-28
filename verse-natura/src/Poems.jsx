import { useContext } from "react";
import "./App.css";
import "./Poems.css";
import { RouteContext } from "./context/RouteProvider.jsx";
import { AiOutlineSearch } from "react-icons/ai";
import AppBar from "./AppBar.jsx";

function Poem() {
  const { title, poem, error, onTitleChange, newPoem } =
    useContext(RouteContext);
  console.log(poem.map((poem) => poem));

  return (
    <div>

      <div className="search-container">
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          name="title"
          placeholder="Search for a poem"
        />
        <button onClick={newPoem}>
            <AiOutlineSearch />
        </button>
      </div>
    <form onSubmit={newPoem}>
      {poem.map((poem) => (
        <div className="poem-container">
          <p className="title sans serif">{poem?.title}</p>
          <p className="author">{poem?.author}</p>
          <p className="line-container">
            {poem?.lines?.map((lines) => (
              <p>{lines}</p>
            ))}
          </p>
          <p style={{margin: 0, padding: 0}}>Line Count = {poem?.linecount}</p>
        </div>
      ))}

      {error}
    </form>
    <AppBar />
    </div>
  );
}

export default Poem;
