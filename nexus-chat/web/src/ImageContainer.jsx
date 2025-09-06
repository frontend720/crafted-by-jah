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
  ModalContent,
  ModalOverlay,
  FileInputLabel,
  InspirationImage,
  CancelLabel
} from "./UIComponents";
import { BiPaint } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { AxiosContext } from "./AxiosContext";
export default function ImageContainer() {
  const { localTheme, themes, themeIndex } = useContext(ThemeContext);
  const {
    generateNewImageRequest,
    imageUrl,
    imageArray,
    isImageProcessing,
    welcomeImageText,
    imageToInterpret,
    firebase_image_url,
    description,
  } = useContext(AxiosContext);
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);

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

  function onModalInspirationChange() {
    setIsInspirationModalOpen((prev) => !prev);
  }

  const changeTheme = themes[themeIndex].gradient;

  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
    }, 25);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (url !== null) {
      imageToInterpret(url);
    }
  }, [url]);

  return (
    <Container bottom="350px" background={changeTheme}>
     <CancelLabel style={isInspirationModalOpen ? {display: "none"} : {display: "", background: "transparent"}} onClick={onModalInspirationChange} right="0">
        <FaWandMagicSparkles size="30px" />
     </CancelLabel>
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
                maxLength={1000}
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
      <ModalOverlay display={isInspirationModalOpen ? "" : "none"}>
        <ModalContent>
             <CancelLabel style={{background: "none"}} right="0px" onClick={onModalInspirationChange}>
       <GrClose />
      </CancelLabel>
          <input
            type="file"
            name="url"
            onChange={(e) => setUrl(e.target.files[0])}
            id="file-upload"
            style={{ display: "none" }}
          />
          <FileInputLabel htmlFor="file-upload">
            Choose {firebase_image_url === null ? "" : "Different"} Image to Upload
          </FileInputLabel>
          <InspirationImage src={firebase_image_url} />
          <SendButton onClick={onModalInspirationChange} style={firebase_image_url === null ? {display: "none"} : { width: "100%" }} background="#444444 !important">
            <label
              style={{
                color: "#e7e7e7",
                textAlign: "center !important",
                fontWeight: 700,
              }}
              htmlFor=""
            >
              Finish
            </label>
          </SendButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}
