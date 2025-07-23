import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Authentication() {
  const [authToggle, setAuthToggle] = useState(false);
  const [visible, setVisible] = useState(false)
  const {
    createUser,
    signin,
    onEmailChange,
    onPasswordChange,
    email,
    password,
    error,
    success,
  } = useContext(AuthContext);

  function onToggleChange(e) {
    e.preventDefault();
    setAuthToggle((prev) => !prev);
  }

  function onVisible(){
    setVisible(prev => !prev)
  }

  console.log(email, password);
  return (
    <div className="auth-container">
      <form className="auth-form" action="">
        <label className="auth-title" style={{textAlign: "center"}} htmlFor="">{!authToggle ? "Login" : "Signup"}</label>
        <input
        className="auth-inputs"
          type="text"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
        <div className="auth-input-container">

        <input
        className="auth-inputs password-input"
          type={visible ? "text" : "password"}
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <label onClick={onVisible} style={{marginTop: 6, marginLeft: 10, color: "#e8e8e8"}} htmlFor="">{!visible ? <IoEye /> : <IoEyeOff />}</label>
        </div>
        <button className="authentication-button" style={{textTransform: "uppercase"}} onClick={authToggle ? createUser : signin}>Continue</button>
        <label className="error-label" htmlFor="">

        {error}
        </label>
        <button className="authentication-type" onClick={onToggleChange}>{authToggle ? "Login Here" : "Create Account"}</button>
      </form>
      {success}
    </div>
  );
}
