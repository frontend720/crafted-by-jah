import axios from "axios";
import { createContext, useState, useEffect } from "react";
import moment from "moment";
import { setDefaults, geocode, RequestType } from "react-geocode";

setDefaults({
  key: import.meta.env.VITE_GEOCODING_API_KEY,
  language: "en",
});

const AxiosContext = createContext();

function AxiosContextProvider({ children }) {
  const [chatLog, setChatLog] = useState([]);
  const [coords, setCoords] = useState({});
  const [weatherData, setWeatherData] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [isRequestComplete, setIsRequestComplete] = useState(true);
  const [welcomeImageText, setWelcomeImageText] = useState(true)
  const [welcomeChatText, setWelcomeChatText] = useState(true)

  const [styledIndex, setStyleIndex] = useState(0);

  const style_array = [
    { style: "3D Model", name: "3D Model" },
    { style: "Analog Film", name: "Analog Film" },
    { style: "Anime", name: "Anime" },
    { style: "Cinematic", name: "Cinematic" },
    { style: "Comic Book", name: "Comic Book" },
    {style: undefined, name: "None"}
  ];

  const style_model = style_array[styledIndex].style;
  const style_name = style_array[styledIndex].name
  
  function changeStyle(){
      setStyleIndex(prev =>( prev + 1) % style_array.length)
    }

    const [modelIndex, setModelIndex] = useState(0)
    
    const text_model = [
      {model: "venice-uncensored", name: "Venice Unleashed (Uncensored)", tokens: 750, top_p: 0.75, temp: 0.9},
      {model: "dolphin-2.9.2-qwen2-72b", name: "Dolphin Insight (Uncensored)", tokens: 275, top_p: 0.2, temperature: 0.4},
      {model: "llama-3.1-405b", name: "Llama Pro", tokens: 500,  top_p: 0.2, temperature: 0.7}
    ]

    function changeModel(){
        setModelIndex(prev => (prev + 1) % text_model.length)
    }
//   console.log(style_model)
console.log(text_model[modelIndex].model)
const chat_model = text_model[modelIndex].model
const tokens = text_model[modelIndex].tokens
const top_p = text_model[modelIndex].top_p
const temp = text_model[modelIndex].temp

  function newChatRequest(name, prompt, username) {
    console.log(name, prompt, username);
    const chat = chatLog.map((chat) => chat.sender + chat.text);
    console.log(chat);
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/chat`,
      data: {
        bot_name: name,
        prompt: prompt,
        name: username,
        chatLog: chat,
        timestamp: moment().format("LLL"),
        location: address,
        weather: `${weatherData?.current.weather[0].description}, ${weatherData?.current.feels_like}°`,
        model: chat_model,
        tokens: tokens,
        top_p: top_p,
        temp: temp
      },
    })
      .then((response) => {
        const systemResponse = response.data;
        const newChatEntries = [
          {
            sender: "user",
            text: prompt,
          },
          {
            sender: "system",
            text: systemResponse?.system,
          },
        ];
        setChatLog((prev) => [...prev, ...newChatEntries]);
        setIsRequestComplete(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsRequestComplete(false);
    setWelcomeChatText(false)
  }

  const [imageArray, setImageArray] = useState([]);
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  function generateNewImageRequest(prompt, model) {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/image`,
      data: {
        prompt: prompt,
        model: model,
        style_preset: style_model
      },
    })
      .then((url) => {
        setImageUrl(url.data.imageUrl);
        const newUrl = url.data.imageUrl;
        setImageArray((prev) => [...prev, newUrl]);
        setIsImageProcessing(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsImageProcessing(true);
    setWelcomeImageText(false)
  }

  function getWeatherAndLocationInformation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    const success = (position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = () => {
      console.log("Unable to determine the users location");
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  async function getWeather() {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${
          coords?.latitude
        }&lon=${coords?.longitude}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=imperial`,
      });
      setWeatherData(response.data);
    //   console.log(response);
    } catch (error) {
      console.error("Weather API Error:", error.message);
    }
  }

//   console.log(imageArray);
//   console.log(imageUrl);

  function getPreciseLocation() {
    geocode(RequestType.LATLNG, `${coords?.latitude},${coords?.longitude}`)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch((error) => {
        return (error);
      });
  }

  useEffect(() => {
    getPreciseLocation();
  }, [coords]);

//   console.log(weatherData);

  //   useEffect(() => {
  //     getWeatherAndLocationInformation();
  //   }, []);

  useEffect(() => {
    getWeather();
  }, [coords]);

  return (
    <AxiosContext
      value={{
        newChatRequest,
        getWeatherAndLocationInformation,
        generateNewImageRequest,
        changeStyle,
        changeModel,
        weatherData,
        coords,
        chatLog,
        address,
        imageUrl,
        imageArray,
        isRequestComplete,
        isImageProcessing,
        style_model,
        style_name,
        text_model,
        welcomeImageText,
        welcomeChatText,
        modelIndex
      }}
    >
      {children}
    </AxiosContext>
  );
}

export { AxiosContextProvider, AxiosContext };
