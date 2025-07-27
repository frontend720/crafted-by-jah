import { createContext, useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { storage } from "./config";

const RouteContext = createContext();

function ChatContext({ children }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [interpretation, setInterpretation] = useState("Upload an image to get an image description");
  const [chatId, setChatId] = useState(() => {
    try {
      const savedChat = localStorage.getItem("chatId");
      return savedChat ? JSON.parse(savedChat) : null;
    } catch (error) {
      console.log("No chat ID", error);
    }
  });

  useEffect(() => {
    localStorage.setItem("chatId", JSON.stringify(chatId));
    console.log("Successfully saved chat ID");
  }, [chatId]);

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const savedConversation = localStorage.getItem("conversation");
      return savedConversation ? JSON.parse(savedConversation) : [];
    } catch (error) {
      console.log("No conversation to retrieve", error);
    }
  });

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(chatHistory));
    console.log("Successfully received conversation");
  }, [chatHistory]);

  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imageToggle, setImageToggle] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [size, setSize] = useState(false);
  const [conversationName, setConversationName] = useState("");
  const [topP, setTopP] = useState();
  const [isResponding, setIsResponding] = useState(false);

  function handleConversationSubmit(e) {
    e.preventDefault();

    if (!prompt.trim()) return;

    const currentPrompt = prompt;
    setPrompt("");
    setIsResponding(true); // Set responding state early

    // 1. Create a string from the existing history for the API call.
    // Using .join("\n") makes it more readable for the AI.
    const historyForApi = chatHistory
      .map(
        (chat) => `${chat.question}\n${chat.response}\n${chat.imageDescription}`
      )
      .join("\n");

    axios({
      method: "POST",
      url: import.meta.env.VITE_NGROK_URL,
      data: {
        // 2. Build the content string logically.
        content: `${historyForApi}\n${interpretation || ""}\n${currentPrompt}`,
        topP: Number(topP) || 0.5,
        name: assistant,
        instructions: instructions,
        image: url,
        imageDescription: interpretation,
      },
    })
      .then((res) => {
        let aiResponse = res.data;
        if (Array.isArray(aiResponse) && aiResponse.length > 0) {
          aiResponse = aiResponse[0];
        } else if (aiResponse && typeof aiResponse !== "string") {
          aiResponse = String(aiResponse);
        }

        setResponse(aiResponse);

        // 3. This object is for saving to the DB and updating local state.
        const newExchange = {
          question: currentPrompt,
          response: aiResponse,
          image: url || null,
          imageDescription: interpretation || null,
        };

        // Now, update the local state. The next API call will use this new history.
        setChatHistory((prevHistory) => [...prevHistory, newExchange]);
        setUrl("");
        setInterpretation(""); // Clear interpretation after use

        if (chatId) {
          patchChatToBackend(chatId, newExchange);
        } else {
          postNewChatToBackend(newExchange);
        }
      })
      .catch((error) => {
        console.error("Error in AI conversation API call:", error);
        setResponse("Error getting response from AI.");
      })
      .finally(() => {
        // 4. Always set isResponding to false when the process is done.
        setIsResponding(false);
      });
  }

  console.log(interpretation, url);

  function patchChatToBackend(id, exchange) {
    // The payload for PATCH must match what your backend's $push expects
    const payload = {
      chat: exchange, // This will push the { question, response } object into the chat array
    };

    axios
      .patch(`${import.meta.env.VITE_NGROK_URL}/chat/${id}`, payload)
      .then((res) => {
        console.log("Chat updated successfully:", res.data);
        setIsResponding(false);
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
    if (image) {
      uploadImage();
    }
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
        isResponding,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export { ChatContext, RouteContext };
