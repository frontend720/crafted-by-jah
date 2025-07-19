/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";
import { TbMoodLookDown } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "https://esm.sh/remark-gfm@4";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(""); // Stores the latest AI response
  const [chatId, setChatId] = useState(null); // Stores the current conversation ID
  const [chatHistory, setChatHistory] = useState([]); // Stores all messages for display
  const [conversationName, setConversationName] = useState(""); // Optional: for naming conversations
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [interpretation, setInterpretation] = useState()
  const [size , setSize] = useState(false)
  const imageRef = ref(storage, `images/${uuidv4()}`);

  function imageSize(){
    setSize(prev => !prev)
  }

  // unction to load an existing conversation
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
      //   setResponse("");
      console.log("Loaded existing conversation:", res.data);
    } catch (error) {
      console.error("Error loading conversation:", error);
      setChatId(null); // Clear ID if loading fails
      setChatHistory([]);
    }
  };

  //   useEffect(() => {
  //     loadExistingConversation()
  //   }, [response])

  function handleConversationSubmit(e) {
    e.preventDefault();

    if (!prompt.trim()) return; // Don't send empty prompts

    const currentPrompt = prompt; // Capture prompt value
    setPrompt("");

    axios({
      method: "POST", 
      url: import.meta.env.VITE_NGROK_URL,
      data: {
        content:
        interpretation +
          currentPrompt +
          chatMessages.map((chat) => chat?.question + chat?.response) +
          currentPrompt,
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

  const [chatMessages, setChatMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 4. Function to fetch the chat from the backend
  //    Made it async/await for modern JS readability, but .then/.catch is fine too.
  const getChatFromBackend = async () => {
    if (!chatId) {
      // Ensure we have an ID before trying to fetch
    //   console.log("No chatId to fetch.");
      return;
    }

    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_NGROK_URL}/chat/${chatId}`
      );
      setChatMessages(res.data.chat || []); // Use || [] to ensure it's always an array

    //   console.log("Successfully fetched and set state:", res.data.chat);
    } catch (err) {
      console.error("Error fetching chat from backend:", err);
      setError("Failed to load chat. Please check console for details.");
      setChatMessages([]); // Clear messages on error
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  // 5. useEffect to trigger the fetch when `chatId` changes
  useEffect(() => {
    getChatFromBackend(); // Call the fetch function
  }, [chatHistory]);

//   console.log(chatMessages);

  // Function to create a brand new conversation entry (first message)
  function postNewChatToBackend(exchange) {
    const payload = {
      chat: [exchange], // New chat starts with the first exchange
      conversationName: "New Chat " + new Date().toLocaleTimeString(), // Or let user name it
    };

    axios
      .post(`${import.meta.env.VITE_NGROK_URL}/chat`, payload)
      .then((res) => {
        // console.log("New chat created:", res.data);
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

  function uploadImage() {
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setUrl(url);
      });
  }

  function interpretImage() {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/image_analysis`,
      data: {
        imageUrl: url,
      },
    })
      .then((data) => {
        setInterpretation(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    useEffect(() => {
      interpretImage();
    }, [url]);

    useEffect(() => {
      uploadImage();
    }, [image]);

  return (
    <div
      className={chatId === null ? "chat-container-empty" : "chat-container"}
    >
      <div
        style={chatId === null ? { display: "" } : { display: "none" }}
        className="welcome-container"
      >
        <div>

        <h1 className="quays-world">Quay's World</h1>
        <p>To talk to Quay, type something</p>
        </div>
      </div>
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

      <form
        className={chatId === null ? "form-container-empty" : "form-container"}
        onSubmit={handleConversationSubmit}
      >
          <img onClick={imageSize} src={url} width={size ? "25px" : "100px"} alt="" />
        <TextareaAutosize
          maxRows={4}
          className="textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What's up?"
        />
        <div className="flex">
            <label htmlFor="upload-button">
              <LuSmilePlus size="20px" />
            </label>
          <input
            id="upload-button"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="submit-button" type="submit">
            <IoSend size="20px" />
          </button>
        </div>
      </form>

      <div style={{ marginTop: "20px", padding: "10px", paddingBottom: 200 }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p className="prompt">
              <strong className="participants">You:</strong> {item.question}
            </p>
            <p className="response">
              <strong className="participants">Quay:</strong>
              <ReactMarkdown remarkPlugins={remarkGfm}>
                {item.response}
              </ReactMarkdown>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
