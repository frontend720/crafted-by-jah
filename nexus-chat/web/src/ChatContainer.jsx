import { useContext, useState } from "react";
import {
  Container,
  MessageText,
  TextContainer,
  InputContainer,
  StyledTextarea,
  SendButton,
  P,
  EM,
  UL,
  OL,
  ListItem,
  H1,
  Strong,
} from "./UIComponents.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import { GrSend } from "react-icons/gr";
import { AxiosContext } from "./AxiosContext.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

export default function ChatContainer() {
  const { localTheme, themes, themeIndex } = useContext(ThemeContext);
  const { newChatRequest, chatLog } = useContext(AxiosContext);

  console.log(chatLog);

  const [userPrompt, setUserPrompt] = useState("");

  function onPromptChange(e) {
    setUserPrompt(() => e.target.value);
  }

  function handleSendClick() {
    if (userPrompt.trim() !== "") {
      newChatRequest("Deandre", userPrompt), setUserPrompt("");
    }
  }

  const changeTheme = themes[themeIndex].gradient;

  return (
    <div className="App">
      <Container background={changeTheme}>
        {chatLog.map((message, index) => (
          <TextContainer
            radius={message.sender === "user" ? "10px 0px 10px 10px" : ""}
            align={message.sender === "user" ? "flex-end" : "flex-start"}
            isUser={message.sender == "user" ? "#dabdbdb1" : "#5a6b61b5"}
          >
            {message.sender === "user" ? (
              <MessageText
                weight={message.sender === "user" ? 400 : 500}
                font_color={message.sender === "user" ? "#020202ff" : "#f7f7f7"}
                align={message.sender === "user"}
              >
                {` ${message.text}`}
              </MessageText>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Pass your styled components to format the markdown output
                  p: ({ node, ...props }) => (
                    <MessageText
                      weight={500}
                      font_color="#f7f7f7"
                      align={false}
                      {...props}
                    />
                  ),
                  strong: Strong,
                  em: EM,
                  h1: H1,
                  ul: UL,
                  ol: OL,
                  li: ListItem,
                  p: P
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </TextContainer>
        ))}
        <InputContainer>
          <StyledTextarea
            onChange={onPromptChange}
            value={userPrompt}
            name="userPrompt"
            maxRows={7}
            className="chat-textarea"
          />
          <SendButton onClick={() => handleSendClick("DeAndre", userPrompt)}>
            <GrSend size="24px" color="#e8e8e8" />
          </SendButton>
        </InputContainer>
      </Container>
    </div>
  );
}
