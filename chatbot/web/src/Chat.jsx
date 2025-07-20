/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { TypeAnimation } from "react-type-animation";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";
import { TbMoodLookDown } from "react-icons/tb";
import { MdSettingsSuggest } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "https://esm.sh/remark-gfm@4";
import { RouteContext } from "./ChatContext";
import Settings from "./Settings";

export default function Chat() {
  const {
    handleConversationSubmit,
    prompt,
    setPrompt,
    chatHistory,
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
    // conversationName,
    setConversationName,
    assistant,
    isResponding
  } = useContext(RouteContext);

  const [toggleForm, setToggleForm] = useState(false);

  function toggleChange(e) {
    e.preventDefault();
    setToggleForm((prev) => !prev);
  }
console.log(isResponding)
  return (
    <>
      <div
        className={chatId === null ? "chat-container-empty" : "chat-container"}
      >
        <div
          style={chatId === null ? { display: "" } : { display: "none" }}
          className="welcome-container"
        >
          <div>
            <h1 className="quays-world">Tariq's World</h1>
            <label>To talk to Quay, type something</label>
          </div>
        </div>
        <div className="upper-flex">
          <button
            onClick={() => {
              setChatId(null);
              setChatHistory([]);
              setConversationName("");
              setResponse("");
              setUrl("");
              setInterpretation("");
            }}
            style={chatId !== null ? { opacity: 1 } : { opacity: 0 }}
            className="new-button"
          >
            <MdArrowBackIosNew size="20px" />
          </button>
        </div>
        <Settings
          onCloseForm={toggleChange}
          form_toggle={toggleForm ? { display: "" } : { display: "none" }}
        />
        {/* Add a button/logic to load existing conversations here for testing */}
        {/* For example: <button onClick={() => loadExistingConversation("some_existing_id")}>Load Existing</button> */}
        <div
          style={toggleModal ? { display: "" } : { display: "none" }}
          className="modal"
        >
          <button className="modal-button" onClick={isModalVisible}>
            Close
          </button>
          <ReactMarkdown
            children={interpretation}
            remarkPlugins={[remarkGfm]}
          />
        </div>

        <form
          className={
            chatId === null ? "form-container-empty" : "form-container"
          }
          onSubmit={handleConversationSubmit}
        >
          <div className="preview-flex">
            <img
              style={url === "" ? { display: "none" } : { display: "" }}
              onClick={imageSize}
              src={url}
              width={size ? "25px" : "100px"}
              alt=""
            />
            <FaInfo
              size="20px"
              style={
                imageToggle
                  ? { display: "", marginLeft: 10 }
                  : { display: "none" }
              }
              onClick={isModalVisible}
            />
          </div>
          <TextareaAutosize
            maxRows={4}
            className="textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What's up?"
          />
          <div className="flex">
            <div className="set_buttons">
              <label htmlFor="upload-button">
                <LuSmilePlus size="20px" />
              </label>
              <input
                id="upload-button"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button className="settings-button" onClick={toggleChange}>
                <MdSettingsSuggest size="25px" />
              </button>
            </div>
            <button className="submit-button" type="submit">
              <IoSend size="20px" />
            </button>
          </div>
        </form>

        <div style={{ marginTop: "20px", padding: "10px", paddingBottom: 200 }}>
          <>
            {chatHistory.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p className="prompt">
                  <strong className="participants">You:</strong> {item.question}
                </p>
                <strong className="participants">
                  {assistant || "Deandre"}:
                </strong>
                <ReactMarkdown remarkPlugins={remarkGfm}>
                  {item.response}
                </ReactMarkdown>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}
