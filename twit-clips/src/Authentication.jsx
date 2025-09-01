import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { MdOutlineMail } from "react-icons/md";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
export default function Authentication() {
  const [toggleAuthenticationType, setToggleAuthenticationType] =
    useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const {
    signUp,
    login,
    email,
    password,
    username,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
  } = useContext(AuthContext);

  function onAuthToggle(e) {
    e.preventDefault();
    setToggleAuthenticationType((prev) => !prev);
  }

  function passwordVisible() {
    setToggleVisibility((prev) => !prev);
  }
  return (
    <div className="authentication-container">
      <form className="authentication-form" action="">
        <h1 className="auth-title">
          {toggleAuthenticationType
            ? "Create a new TwitClip Account"
            : "Welcome  Back to TwitClip"}
        </h1>
        <div className="auth-input-container" style={
              toggleAuthenticationType ? { display: "" } : { display: "none" }
            }>
          <input
            className="auth-input"
            type="text"
            name="username"
            value={username}
            onChange={onUsernameChange}
            placeholder="Username"
          />
          <div className="auth-icon">
            <IoPersonOutline size="28px" />
          </div>
        </div>
        <div className="auth-input-container">
          <input
            className="auth-input"
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
          />
          <div className="auth-icon">
            <MdOutlineMail size="28px" />
          </div>
        </div>
        <div className="auth-input-container">
          <input
            className="auth-input"
            type={toggleVisibility ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
          <div onClick={passwordVisible} className="auth-icon">
            {toggleVisibility ? <LuEyeClosed size="28px" /> : <LuEye size="28px" />}
          </div>
        </div>
        <button type="submit" className="authentication-button" onClick={toggleAuthenticationType ? signUp : login}>
          Continue
        </button>
        <div className="toggle-auth" onClick={onAuthToggle}>
          {toggleAuthenticationType ? "Login" : "Create New Account"}
        </div>
      </form>
    </div>
  );
}
