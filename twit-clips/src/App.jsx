import "./App.css";
import { useContext, useState, useEffect } from "react";
import { APIContext } from "./APIContext";
import Search from "./Search";
import Saves from "./Saves";
import { Outlet, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RiMenu2Line } from "react-icons/ri";

function App() {
  const {username, onChange, newTweetRequest, toggleNavbar} = useContext(APIContext)
  const [toggleMenu, setToggleMenu] = useState(true)

  function onToggle(){
    setToggleMenu(prev => !prev)
  }

  useEffect(() => {
    onToggle()
  }, [toggleNavbar])
  return (
    <>
      <nav className={toggleMenu ? "navbar" : "navbar-closed"}>
        <div style={{padding: 6}} onClick={onToggle}>
    {!toggleMenu ?  <RiMenu2Line /> : <GrClose />}
        </div>
        <div style={toggleMenu ? {display: "flex", flexDirection: "column"} : {display: "none"}}>

        <Link onClick={onToggle} to="/">
          Search
        </Link>
        <Link onClick={onToggle} to="/saves">
          Favorites
        </Link>
        <li style={{width: "100vw", display: "flex", flexDirection: "row", alignItems: "center"}}>
          <input placeholder="Handle" className="username-input" type="text" name="username" value={username} onChange={onChange} />
          <FaSearch onClick={newTweetRequest} size="32px" style={{marginTop: 16, paddingLeft: 16}} />
        </li>
        </div>
      </nav>
      {/* <Search /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
