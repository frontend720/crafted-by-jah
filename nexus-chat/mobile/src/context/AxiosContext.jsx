import { createContext, useState, useCallback } from "react";

const AxiosContext = createContext();

function AxiosContextProvider({ children }) {
  const [styleIndex, setStyleIndex] = useState(0);

  const style_array = [
    { style: undefined, name: "Default" },
    { style: "3D Model", name: "3D Model" },
    { style: "Analog Film", name: "Analog Film" },
    { style: "Anime", name: "Anime" },
    { style: "Cinematic", name: "Cinematic" },
    { style: "Comic Book", name: "Comic Book" },
  ];

  function changeImageStyle() {
    setStyleIndex((prev) => (prev + 1) % style_array.length);
  }
  const [imageModelIndex, setImageModelIndex] = useState(0);

  const image_model = [
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
      name: "LustifyLens (X)",
    },
    {
      model: "wai-Illustrious",
      name: "AnimeAura (X)",
    },
    {
      model: "pony-realism",
      name: "PonyReal (X)",
    },
  ];

  function changeImageModel() {
    setImageModelIndex((prev) => (prev + 1) % image_model.length);
  }

  const [modelIndex, setModelIndex] = useState(0);

  const text_model = [
    {
      model: "venice-uncensored",
      name: "Venice Unleashed",
      tokens: 750,
      top_p: 0.75,
      temp: 0.9,
    },
    {
      model: "dolphin-2.9.2-qwen2-72b",
      name: "Dolphin Insight",
      tokens: 275,
      top_p: 0.2,
      temperature: 0.4,
    },
    {
      model: "llama-3.1-405b",
      name: "Llama Pro",
      tokens: 500,
      top_p: 0.2,
      temperature: 0.7,
    },
  ];

  function changeTextModel() {
    setModelIndex((prev) => (prev + 1) % text_model.length);
  }

  const currentStyleName = style_array[styleIndex].name;
  const currentImageModelName = image_model[imageModelIndex].name;
  const currentModelName = text_model[modelIndex].name;
  const currentStyle = style_array[styleIndex].style;
  const currentModel = text_model[modelIndex].model;
  const tokens = text_model[modelIndex].tokens;

  const [prompt, setPrompt] = useState("");

  const onPromptChange = useCallback((e) => {
    setPrompt(e.detail.value);
  });

  return (
    <AxiosContext.Provider
      value={{
        currentStyleName,
        currentModelName,
        currentImageModelName,
        changeImageStyle,
        changeImageModel,
        changeTextModel,
        prompt,
        onPromptChange,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}

export { AxiosContextProvider, AxiosContext };
