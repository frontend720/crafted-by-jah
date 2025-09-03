import React, { useContext, useState } from "react";
import { Container } from "./UIComponents";
import { ThemeContext } from "./ThemeContext";
import { InputContainer, StyledTextarea, SendButton } from "./UIComponents";
import { BiPaint } from "react-icons/bi";
import { AxiosContext } from "./AxiosContext";
export default function ImageContainer() {
  const { localTheme, themes, themeIndex } = useContext(ThemeContext);
  const { generateNewImageRequest, imageUrl, imageArray } =
    useContext(AxiosContext);
  const [prompt, setPrompt] = useState("");

  console.log(prompt);

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

  console.log(localTheme);

  const changeTheme = themes[themeIndex].gradient;
  return (
    <Container bottom="350px" background={changeTheme}>
      <div>
        <label htmlFor=""></label>
        {imageArray?.map((image) => (
          <>
            <img src={image} width="100%" alt="" />
          </>
        ))}
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
            <div className="model-container">
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
