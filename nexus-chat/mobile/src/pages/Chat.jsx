import { IonPage, IonCard, IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
import { useState, useEffect, useContext } from "react";
import ExploreContainer from "../components/ExploreContainer.jsx";
import "./Tab1.css";
import { ThemeContext } from "../context/ThemeContext.jsx";
import chat from "../conversation.json";
import { ChatText, TextArea, TextAreaButton, TextareaContainer } from "../Styles.jsx";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import rehypeRaw from "rehype-raw";
import { AxiosContext } from "../context/AxiosContext.jsx";

dayjs.extend(relativeTime);

const Chat = () => {
  const { theme, degrees } = useContext(ThemeContext);
  const { prompt, onPromptChange } = useContext(AxiosContext);


  return (
    <IonPage>
      <div
        className="container"
        style={
          theme
            ? {
                background: `linear-gradient(${degrees}deg,rgba(250, 241, 230, 1) 0%, rgba(253, 250, 246, 1) 50%, rgba(228, 239, 231, 1) 100%)`,
              }
            : {
                background: `linear-gradient(${degrees}deg,#0f0f0fff 0%, rgba(30, 32, 31, 1) 50%, #2c302fff 100%)`,
              }
        }
      >
        <div style={{ marginTop: 50, marginBottom: 225 }}>
          {chat.map((chat) => (
            <div
              className={`message_wrapper ${
                chat.sender === "user" ? "right-aligned" : "left-aligned"
              }`}
            >
              <IonCard
                className="ion-card"
                color={theme ? "#ffffff" : "#1c1c1d"}
                style={{ padding: 6, width: "85%" }}
              >
                <ChatText color={theme ? "#1c1c1d" : "#ffffff"}>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    children={chat.text}
                  />
                </ChatText>
                <ChatText color={theme ? "#1c1c1d80" : "#ffffff80"}>
                  {dayjs(chat.timestamp).fromNow()}
                </ChatText>
              </IonCard>
            </div>
          ))}
        </div>
        <TextareaContainer
          style={{
            background: theme ? "#FBF5EC" : "#141515",
          }}
        >
          <TextArea
            name="prompt"
            className={theme ? "textarea-light" : "textarea"}
            value={prompt}
            onIonInput={onPromptChange}
            border={theme ? "0.25px solid #2C302F95" : "0.25px solid #FBF5EC"}
            placeholder="Type your message..."
            autoGrow
            style={theme ? { width: "100%", background: "#FBF5EC !important", color: "#ffffff !important" } : {color: "#ffffff !important"}}
            labelPlacement="stacked"
            counter={true}
          >
            <TextAreaButton fill="clear" slot="end">
              <div
                style={
                  theme
                    ? { color: "#2C302Fbe", fontSize: 24 }
                    : { color: "rgba(228, 239, 231)", fontSize: 24 }
                }
              >
                <IonIcon color={theme ? "#FBF5EC" : "#2C302F"} icon={send} />
              </div>
            </TextAreaButton>
          </TextArea>
        </TextareaContainer>
      </div>
    </IonPage>
  );
};

export default Chat;
