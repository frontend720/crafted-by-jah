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
import { AiOutlineLogout } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "https://esm.sh/remark-gfm@4";
import { RouteContext } from "./ChatContext";
import Settings from "./Settings";
import { ThemeContext } from "./ThemeContext";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import avatar from "./assets/FA62F2D2-CBBD-447E-8EB1-5C37F04E5F1F_1_102_o.jpeg";
import { AuthContext } from "./AuthContext";

export default function Chat() {
  const { onThemeChange, theme } = useContext(ThemeContext);
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
    setConversationName,
    assistant,
    isResponding,
  } = useContext(RouteContext);
  const { logout } = useContext(AuthContext);

  console.log(theme);

  const [toggleForm, setToggleForm] = useState(false);

  function toggleChange(e) {
    e.preventDefault();
    setToggleForm((prev) => !prev);
  }

  const [clear, setClear] = useState(() => {
    const remove = localStorage.removeItem("conversation");
    return remove;
  });

  console.log(clear)
  console.log(isResponding);
  return (
    <>
      <div
        className={
          chatHistory.length === 0 && chatId === null
            ? "chat-container-empty"
            : "chat-container"
        }
      >
        <div
          style={
            chatHistory.length === 0 && chatId === null
              ? { display: "" }
              : { display: "none" }
          }
          className="welcome-container"
        >
          <div className="title-container">
            <h1 className="quays-world">
              {assistant === "" ? "Tariq's" : `${assistant}'s`} World
            </h1>
            <label className="summary">
              To talk to {assistant === "" ? "Tariq" : `${assistant}`}, type
              something
            </label>
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
              setClear()
            }}
            style={
              chatId !== null
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="new-button"
          >
            <MdArrowBackIosNew
              style={theme ? { color: "#d6d6d6" } : { color: "#444444" }}
              size="20px"
            />
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
            chatHistory.length === 0 && chatId === null
              ? "form-container-empty"
              : "form-container"
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
            className={chatId === null ? "textarea-empty" : "textarea"}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What's up?"
          />
          <div className="flex">
            <div className="set_buttons">
              <label htmlFor="upload-button">
                <LuSmilePlus
                  color={chatId === null ? "#e8e8e8" : "#333333"}
                  size="20px"
                />
              </label>
              <input
                id="upload-button"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button className="settings-button" onClick={toggleChange}>
                <MdSettingsSuggest
                  color={chatId === null ? "#e8e8e8" : "#333333"}
                  size="25px"
                />
              </button>
              <button
                style={chatId === null ? { display: "none" } : { display: "" }}
                onClick={onThemeChange}
                className="settings-button"
              >
                {!theme ? (
                  <IoMoonOutline
                    size="25px"
                    color={chatId === null ? "#e8e8e8" : "#333333"}
                  />
                ) : (
                  <IoSunnyOutline
                    size="25px"
                    color={chatId === null ? "#e8e8e8" : "#333333"}
                  />
                )}
              </button>
            </div>
            <button className="submit-button" type="submit">
              <IoSend
                color={chatId === null ? "#e8e8e8" : "#333333"}
                size="20px"
              />
            </button>
          </div>
        </form>

        <div style={{ marginTop: "20px", padding: "10px", paddingBottom: 200 }}>
          <>
            {chatHistory.map((item, index) => (
              <div
                className="response-container"
                key={index}
                style={{ marginBottom: "10px" }}
              >
                <p className="prompt">
                  <strong className="participants">You:</strong> {item.question}
                </p>
                {item?.image && (
                  <img
                    width="100%"
                    src={item?.image}
                    alt={item?.imageDescription}
                  />
                )}
                <div className={theme ? "system" : "system-light"}>
                  <img
                    className="avatar"
                    width="30px"
                    src={avatar}
                    alt={"../../instructions.json"}
                  />
                  <strong className="participants">
                    {assistant || "Tariq"}:
                  </strong>
                </div>
                <div
                  style={theme ? { color: "#d6d6d6" } : { color: "#444444" }}
                >
                  <ReactMarkdown remarkPlugins={remarkGfm}>
                    {item.response}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}
