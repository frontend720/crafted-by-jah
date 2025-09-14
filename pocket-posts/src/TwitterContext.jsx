import { createContext, useState } from "react";
import axios from "axios";

const TwitterContext = createContext();

function TwitterContextProvider({ children }) {
  const [tweet, setTweet] = useState([]);
  const [handle, setHandle] = useState();
  const [continuationToken, setContinuationToken] = useState(null);
  const [token, setToken] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [results, setResults] = useState(null)
  function getTweets(username) {
    axios({
      method: "POST",
      url: import.meta.env.VITE_TWITTER_TWEET_ENDPOINT,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        limit: 40,
      },
    })
      .then((response) => {
        setTweet(() => response.data.results || []);
        // console.log(response.data.results);
        setHandle(response?.data?.results?.user?.username);
        setContinuationToken(response?.data?.continuation_token);
        // console.log(username)
        onIsLoading()
      })
      .catch((error) => {
        console.log(error);
      });
      onIsLoading()
  }

//   console.log(continuationToken);
  function onIsLoading(){
    setisLoading(prev => !prev)
  }
  function continueTweets(username, token) {
    axios({
      method: "POST",
      url: "https://twitter154.p.rapidapi.com/user/tweets/continuation",
      data: {
        username: username,
        limit: 40,
        continuation_token: continuationToken,
        // contination_token: token
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com",
      },
    })
      .then((response) => {
        setTweet((prevTweets) => [
          ...prevTweets,
          ...(response.data.results || []),
        ]);
        onIsLoading()
        // console.log(response.data.results);
        setContinuationToken(response.data.continuation_token);
        setResults(response)
      })
      .catch((error) => {
        console.log(error);
      });
    onIsLoading()
  }

//   console.log(results)
//   function getTweets(username) {
//     axios({
//       method: "POST",
//       url: import.meta.env.VITE_TWITTER_TWEET_ENDPOINT,
//       headers: {
//         "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
//         "x-rapidapi-host": import.meta.env.VITE_TWITTER_AUTH_DOMAIN,
//         "Content-Type": "application/json",
//       },
//       data: {
//         username: username,
//         limit: 40,
//       },
//     })
//       .then((response) => {
//         // Corrected line: Set tweet state to the results array
//         setTweet(response.data.results || []);

//         // Also, your handle logic seems to be trying to access a nested object
//         // but `response.data.results` is an array. You should probably access the first element.
//         setHandle(response?.data?.results?.[0]?.user?.username);

//         setContinuationToken(response?.data?.continuation_token);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   console.log(continuationToken);

//   function continueTweets(username) {
//     axios({
//       method: "POST",
//       url: "https://twitter154.p.rapidapi.com/user/tweets/continuation",
//       data: {
//         username: username,
//         limit: 40,
//         continuation_token: continuationToken,
//       },
//       headers: {
//         "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
//         "x-rapidapi-host": "twitter154.p.rapidapi.com",
//       },
//     })
//       .then((response) => {
//         setTweet((prevTweets) => [
//           ...prevTweets,
//           ...(response.data.results || []),
//         ]);
//         console.log(response.data.results);
//         setContinuationToken(response.data.continuation_token);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
  return (
    <TwitterContext.Provider
      value={{ getTweets, continueTweets, tweet,  continuationToken, isLoading, results }}
    >
      {children}
    </TwitterContext.Provider>
  );
}

export { TwitterContext, TwitterContextProvider };
