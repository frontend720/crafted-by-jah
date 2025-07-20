import React from "react";
import axios from "axios";

export default function ImageUpload() {
  function request(e) {
    e.preventDefault()
    axios({
      method: "POST",
      url: "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en",
      data: {
        body: "This is some new text for text to speech",
      },
      headers: {
        Authorization: import.meta.env.VITE_TEXT_TO_SPEECH_API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
//   async function newRequest() {
//     const url = "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en";
//     const options = {
//       method: "POST",
//       headers: {
//         Authorization: import.meta.env.VITE_TEXT_TO_SPEECH_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: '{"text":"Hello, welcome to Deepgram!"}',
//     };

//     try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  return (
    <div>
      <button onClick={request}>Send Request</button>
      {import.meta.env.VITE_TEXT_TO_SPEECH_API_KEY}
    </div>
  );
}
