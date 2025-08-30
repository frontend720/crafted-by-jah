import axios from "axios";
import { useState, createContext } from "react";

const APIContext = createContext();

function APIContextProvider(props) {
  const [username, setUsername] = useState("");
  const [tweetList, setTweetList] = useState([]);
  const [continuationToken, setContinuationToken] = useState(null);
  const [toggleNavbar, _____________] = useState(false)

  function newTweetRequest(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://twitter154.p.rapidapi.com/user/tweets",
      data: {
        username: username,
        limit: 40,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com",
      },
    })
      .then((data) => {
        setTweetList(()=>data.data.results);
        setContinuationToken(data.data.continuation_token);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

function continueTweetRequests(e) {
  e.preventDefault();
  axios({
    method: "POST",
    url: "https://twitter154.p.rapidapi.com/user/tweets/continuation",
    data: {
      username: username,
      limit: 40,
      // CORRECTED: Use the state variable here
    //   continuation_token: continuationToken, 
      continuation_token: continuationToken
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_API_KEY,
      "x-rapidapi-host": "twitter154.p.rapidapi.com",
    },
  })
    .then((data) => {
      // CORRECTED: This line must be active
      setTweetList((prevTweets) => [...prevTweets, ...(data.data.results || [])]);
 
      setContinuationToken(data.data.continuation_token);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

  console.log(continuationToken)

  console.log(tweetList)

  function onChange(e) {
    const { value } = e.target;
    setUsername(value);
  }

  return (
    <APIContext.Provider
      value={{
        tweetList,
        username,
        toggleNavbar,
        setUsername,
        newTweetRequest,
        continueTweetRequests,
        onChange,
        continuationToken
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
}

export { APIContextProvider, APIContext };
