/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoSend } from "react-icons/io5";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(""); // Stores the latest AI response
  const [chatId, setChatId] = useState(null); // Stores the current conversation ID
  const [chatHistory, setChatHistory] = useState([]); // Stores all messages for display
  const [conversationName, setConversationName] = useState(""); // Optional: for naming conversations

  // Optional: Function to load an existing conversation
  // (You'd call this when a user selects an existing chat from a list)
  const loadExistingConversation = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_NGROK_URL}/chat/${id}`
      );
      setChatId(res.data._id);
      setConversationName(
        res.data.conversationName || `Chat ${id.substring(0, 5)}...`
      );
      setChatHistory(res.data.chat || []); // Make sure to handle if 'chat' array is empty
      setResponse(""); // Clear previous AI response display
      console.log("Loaded existing conversation:", res.data);
    } catch (error) {
      console.error("Error loading conversation:", error);
      setChatId(null); // Clear ID if loading fails
      setChatHistory([]);
    }
  };

  function handleConversationSubmit(e) {
    e.preventDefault();

    if (!prompt.trim()) return; // Don't send empty prompts

    const currentPrompt = prompt; // Capture prompt value
    setPrompt(""); // Clear input field immediately for better UX

    axios({
      method: "POST", // This initial call is always POST to your AI endpoint
      url: import.meta.env.VITE_NGROK_URL, // Your AI endpoint URL
      data: {
        content: currentPrompt,
      },
    })
      .then((res) => {
        let aiResponse = res.data;
        // Ensure aiResponse is a plain string (as discussed previously)
        if (Array.isArray(aiResponse) && aiResponse.length > 0) {
          aiResponse = aiResponse[0];
        } else if (aiResponse && typeof aiResponse !== "string") {
          aiResponse = String(aiResponse);
        }

        setResponse(aiResponse); // Update latest AI response state

        // Add the new exchange to local history for immediate display
        const newExchange = { question: currentPrompt, response: aiResponse };
        setChatHistory((prevHistory) => [...prevHistory, newExchange]);

        // *** Determine whether to POST (new chat) or PATCH (existing chat) ***
        if (chatId) {
          // If we have a chatId, it's an existing conversation, so PATCH
          patchChatToBackend(chatId, newExchange);
        } else {
          // If no chatId, it's a new conversation, so POST to create
          postNewChatToBackend(newExchange);
        }
      })
      .catch((error) => {
        console.error("Error in AI conversation API call:", error);
        setResponse("Error getting response from AI.");
      });
  }

  // Function to create a brand new conversation entry (first message)
  function postNewChatToBackend(exchange) {
    const payload = {
      chat: [exchange], // New chat starts with the first exchange
      conversationName: "New Chat " + new Date().toLocaleTimeString(), // Or let user name it
    };

    axios
      .post(`${import.meta.env.VITE_NGROK_URL}/chat`, payload)
      .then((res) => {
        console.log("New chat created:", res.data);
        if (res.data && res.data._id) {
          setChatId(res.data._id); // Store the ID of the new conversation
        }
      })
      .catch((error) => {
        console.error(
          "Error creating new chat:",
          error.response ? error.response.data : error.message
        );
      });
  }

  function patchChatToBackend(id, exchange) {
    // The payload for PATCH must match what your backend's $push expects
    const payload = {
      chat: exchange, // This will push the { question, response } object into the chat array
    };

    axios
      .patch(`${import.meta.env.VITE_NGROK_URL}/chat/${id}`, payload)
      .then((res) => {
        console.log("Chat updated successfully:", res.data);
      })
      .catch((error) => {
        console.error(
          "Error updating chat:",
          error.response ? error.response.data : error.message
        );
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          console.error("Validation errors:", error.response.data.errors);
        }
      });
  }
  return (
    <div className={chatId === null ? "chat-container-empty" : "chat-container"}>
      <div
        style={chatId === null ? { display: "" } : { display: "none" }}
        className="welcome-container"
      >
        <h1 className="quays-world">Quay's World</h1>
        <p>To talk to Quay, type something</p>
      </div>
      {/* Example button to start a new chat, or load an existing one */}
      {/* {chatId && <p>Current Chat ID: {chatId}</p>} */}
      <button
        onClick={() => {
          setChatId(null);
          setChatHistory([]);
          setConversationName("");
          setResponse("");
        }}
        style={chatId !== null ? { display: "" } : { display: "none" }}
        className="new-button"
      >
        <MdArrowBackIosNew size="20px" />
      </button>
      {/* Add a button/logic to load existing conversations here for testing */}
      {/* For example: <button onClick={() => loadExistingConversation("some_existing_id")}>Load Existing</button> */}

      <form className={chatId === null ? "form-container-empty" : "form-container"} onSubmit={handleConversationSubmit}>
        <TextareaAutosize
          maxRows={4}
          className="textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What's up?"
        />
        <button className="submit-button" type="submit">
          <IoSend size="20px"/>
        </button>
      </form>

      <div style={{ marginTop: "20px", padding: "10px" }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ marginBottom: "100px" }}>
            <p className="prompt">
              <strong className="participants">You:</strong> {item.question}
            </p>
            <p className="response">
              <strong className="participants">Quay:</strong> {item.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
