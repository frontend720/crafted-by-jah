import React, { useContext, useState, useEffect } from "react";

import { ThemeContext } from "./ThemeContext";
import {
  Container,
  InputContainer,
  StyledTextarea,
  SendButton,
  WelcomeContainer,
  WelcomeText,
  WelcomeTitle,
} from "./UIComponents";
import { BiPaint } from "react-icons/bi";
import { AxiosContext } from "./AxiosContext";
export default function ImageContainer() {
  const { localTheme, themes, themeIndex } = useContext(ThemeContext);
  const {
    generateNewImageRequest,
    imageUrl,
    imageArray,
    isImageProcessing,
    welcomeImageText,
  } = useContext(AxiosContext);
  const [prompt, setPrompt] = useState("");

  function onPromptChange(e) {
    setPrompt(e.target.value);
  }
  const [modelChange, setModelChange] = useState(0);

  const models = [
    {
      model: "qwen-image",
      name: "QwenVision",
    },
    {
      model: "venice-sd35",
      name: "VeniceVista",
    },
    {
      model: "hidream",
      name: "HiDreamScope",
    },
    {
      model: "stable-diffusion-3.5",
      name: "Stable Diffusion",
    },
    {
      model: "lustify-sdxl",
      name: "LustifyLens (Uncensored)",
    },
    {
      model: "wai-Illustrious",
      name: "AnimeAura (Uncensored)",
    },
    {
      model: "pony-realism",
      name: "PonyReal (Uncensored)",
    },
  ];

  function onModelChange() {
    setModelChange((prev) => (prev + 1) % models.length);
  }

  function handleSendClick() {
    generateNewImageRequest(prompt, models[modelChange].model);
    setPrompt("");
  }

  const changeTheme = themes[themeIndex].gradient;

  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
    }, 25);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container bottom="350px" background={changeTheme}>
      {welcomeImageText ? (
        <WelcomeContainer>
          <WelcomeTitle>Ready to create something awesome?</WelcomeTitle>
          <WelcomeText>
            Tell me what to draw, and I'll make it for you!
          </WelcomeText>
        </WelcomeContainer>
      ) : null}
      <div>
        <label htmlFor=""></label>
        {imageArray?.map((image) => (
          <>
            <img src={image} width="100%" alt="" />
          </>
        ))}
        <div
          style={
            isImageProcessing
              ? {
                  width: "100%",
                  height: "400px",
                  background: `linear-gradient(${degrees}deg,rgba(216, 226, 220, 1) 0%, rgba(255, 229, 217, 1) 50%, rgba(255, 202, 212, 1) 100%)`,
                }
              : { display: "none" }
          }
        ></div>
        <div className="input-area-wrapper">
          <InputContainer position="inherit" width="100%" display="block">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <StyledTextarea
                name="prompt"
                value={prompt}
                onChange={onPromptChange}
              />
              <SendButton onClick={() => handleSendClick()}>
                <BiPaint size="24px" color="#e8e8e8" />
              </SendButton>
            </div>
            <div
              style={{ marginBottom: "0px !important" }}
              className="model-container"
            >
              <SendButton onClick={onModelChange} padding="16px 0px">
                Change Model
              </SendButton>
              <label htmlFor="">{models[modelChange].name}</label>
            </div>
          </InputContainer>
        </div>
      </div>
    </Container>
  );
}
