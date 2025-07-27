import React, { useState, useEffect } from "react";
import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authObj, setAuthObj] = useState(() => {
    try {
      const savedObj = localStorage.getItem("authObj");
      return savedObj ? JSON.parse(savedObj) : null;
    } catch (error) {
      console.log("Unable to retrieve authentication obj", error);
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("authObj", JSON.stringify(authObj));
    console.log(`Successfully added authentication object to local storage`);
  }, [authObj]);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState();

  function createUser(e) {
    e.preventDefault();
    const createUserReference = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    createUserReference
      .then((user) => {
        if (email.length === 0 && password.length === 0) {
          setError("Must provide a username and password to continue");
        } else {
          setSuccess(user.user.email);
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError(
            "User already exists. Try again with different credentials."
          );
        }
      });
  }

  function signin(e) {
    e.preventDefault();
    const signinReference = signInWithEmailAndPassword(auth, email, password);
    signinReference
      .then((user) => {
        if (email.length === 0 && password.length === 0) {
          setError("Must provide a email and password to continue");
        } else {
          setSuccess(user.user.email);
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError(
            "User not found. Check your credentials or create an account to continue"
          );
        }
      });
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError("");
      setToggle((prev) => !prev);
      setId(timeoutId);
    }, 4000);
  }, [error]);

  useEffect(() => {
    clearInterval(id);
  }, [toggle]);

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj);
    });
  }, []);

  function logout(e) {
    e.preventDefault();
    signOut(auth)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        setError(error.code);
      });
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <AuthContext.Provider
      value={{
        createUser,
        signin,
        logout,
        onEmailChange,
        onPasswordChange,
        email,
        password,
        error,
        success,
        authObj,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
