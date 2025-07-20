import { createContext, useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { storage } from "./config";

const RouteContext = createContext();

function ChatContext({ children }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [interpretation, setInterpretation] = useState();
  const [chatId, setChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [imageToggle, setImageToggle] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [size, setSize] = useState(false);
  const [conversationName, setConversationName] = useState("");
  const [topP, setTopP] = useState()
  const [isResponding, setIsResponding] = useState(false)
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
          chatHistory.map((chat) => chat?.question + chat?.response) +
          currentPrompt,
        topP: Number(topP) || 0.5,
        name: assistant,
        instructions: instructions,
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
          setIsResponding(false)
        } else {
          // If no chatId, it's a new conversation, so POST to create
          postNewChatToBackend(newExchange);
          setIsResponding(false)
        }
        setIsResponding(true)
      })
      .catch((error) => {
        console.error("Error in AI conversation API call:", error);
        setResponse("Error getting response from AI.");
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
        setIsResponding(false)
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

  //   // function to load an existing conversation
  //   const loadExistingConversation = async (id) => {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_NGROK_URL}/chat/${id}`
  //       );
  //       setChatId(res.data._id);
  //       setConversationName(
  //         res.data.conversationName || `Chat ${id.substring(0, 5)}...`
  //       );
  //       setChatHistory(res.data.chat || []); // Make sure to handle if 'chat' array is empty
  //       //   setResponse("");
  //       console.log("Loaded existing conversation:", res.data);
  //     } catch (error) {
  //       console.error("Error loading conversation:", error);
  //       setChatId(null); // Clear ID if loading fails
  //       setChatHistory([]);
  //     }
  //   };

  function toggleImageText() {
    setImageToggle((prev) => !prev);
  }

  const imageRef = ref(storage, `images/${uuidv4()}`);

  function uploadImage() {
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setUrl(url);
      });
  }

  function imageSize() {
    setSize((prev) => !prev);
  }

  function interpretImage() {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/image_analysis`,
      data: {
        imageUrl: url,
        text: "Describe this image, What is happening here?",
      },
    })
      .then((data) => {
        setInterpretation(data.data);
        toggleImageText();
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

  function isModalVisible() {
    setToggleModal((prev) => !prev);
  }

  // User Settings

  const [assistant, setAssistant] = useState("");
  const [instructions, setInstructions] = useState("");
//   const [topP, setTopP] = useState(0.5);
  const [temperature, setTemperature] = useState("");

  function tempChange() {
    if (topP < 0.5) {
      setTemperature("Factual questions & answers");
    } else if (topP > 0.5) {
      setTemperature("Creative writing & conversations");
    } else {
      setTemperature("General Conversations & Brainstorming");
    }
  }
  console.log(topP);
  //

  useEffect(() => {
    tempChange();
  }, [topP]);

  return (
    <RouteContext.Provider
      value={{
        handleConversationSubmit,
        prompt,
        setPrompt,
        response,
        chatHistory,
        toggleImageText,
        uploadImage,
        interpretImage,
        setImage,
        imageToggle,
        chatId,
        isModalVisible,
        toggleModal,
        interpretation,
        url,
        imageSize,
        size,
        setChatId,
        setChatHistory,
        setResponse,
        setUrl,
        setInterpretation,
        conversationName,
        setConversationName,
        setInstructions,
        setTopP,
        setAssistant,
        temperature,
        setTemperature,
        topP,
        assistant,
        instructions,
        isResponding
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export { ChatContext, RouteContext };
