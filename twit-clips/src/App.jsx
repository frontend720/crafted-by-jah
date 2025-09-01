import "./App.css";
import { useContext, useState, useEffect } from "react";
import { APIContext } from "./APIContext";
import { Outlet, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RiMenu2Line } from "react-icons/ri";
import Authentication from "./Authentication";
import { AxiosContext } from "./AxiosContext";
import { AuthContext } from "./AuthContext";

function App() {
  const { username, onChange, newTweetRequest, toggleNavbar } =
    useContext(APIContext);
  const { videos } = useContext(AxiosContext);
  const { user, logout } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(true);

  function onToggle() {
    setToggleMenu((prev) => !prev);
  }

  useEffect(() => {
    onToggle();
  }, [toggleNavbar]);

  function authenticationToggleFunction() {
    logout();
    onToggle();
  }

  function tweetRequestToggle() {
    newTweetRequest();
    onToggle();
  }
  return (
    <>
      {!user ? (
        <Authentication />
      ) : (
        <>
          <nav className={toggleMenu ? "navbar" : "navbar-closed"}>
            <div style={{ padding: 6 }} onClick={onToggle}>
              {!toggleMenu ? <RiMenu2Line /> : <GrClose />}
            </div>
            <div
              style={
                toggleMenu
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "none" }
              }
            >
              <Link onClick={onToggle} to="/">
                Search
              </Link>
              <Link
                style={
                  videos.length === 0 ? { display: "none" } : { display: "" }
                }
                onClick={onToggle}
                to="/saves"
              >
                Favorites
              </Link>
              <li
                style={{
                  width: "100vw",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Handle"
                  className="username-input"
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
                <FaSearch
                  onClick={tweetRequestToggle}
                  size="32px"
                  style={{ marginTop: 16, paddingLeft: 16 }}
                />
              </li>
              <li
                style={{ marginTop: 24 }}
                onClick={authenticationToggleFunction}
              >
                Logout
              </li>
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}

export default App;
