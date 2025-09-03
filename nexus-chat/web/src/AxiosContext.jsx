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

  function newChatRequest(name, prompt) {
    const chat = chatLog.map((chat) => chat.sender + chat.text);
    console.log(chat);
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/chat`,
      data: {
        name: name,
        chatLog: chatLog.map((chat) => chat?.sender, chat?.text),
        prompt: prompt,
        timestamp: moment().format("LLL"),
        location: address,
        weather: `${weatherData?.current.weather[0].description}, ${weatherData?.current.feels_like}°`,
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [imageArray, setImageArray] = useState([]);

  function generateNewImageRequest(prompt, model) {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/image`,
      data: {
        prompt: prompt,
        model: model,
      },
    })
      .then((url) => {
        setImageUrl(url.data.imageUrl);
        const newUrl = url.data.imageUrl
        setImageArray((prev) => [...prev, newUrl]);
      })
      .catch((error) => {
        console.log(error);
      });
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
      console.log(response);
    } catch (error) {
      console.error("Weather API Error:", error.message);
    }
  }

  console.log(imageArray)
  console.log(imageUrl)

  function getPreciseLocation() {
    geocode(RequestType.LATLNG, `${coords?.latitude},${coords?.longitude}`)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPreciseLocation();
  }, [coords]);

  console.log(weatherData);

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
        weatherData,
        coords,
        chatLog,
        address,
        imageUrl,
        imageArray
      }}
    >
      {children}
    </AxiosContext>
  );
}

export { AxiosContextProvider, AxiosContext };
