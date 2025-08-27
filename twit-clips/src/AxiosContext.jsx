import { createContext, useState } from "react";
import axios from "axios";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

const AxiosContext = createContext();

function AxiosContextProvider(props) {
  const [videos, setVideos] = useState();
  const[ newRequest, setNewRequest] = useState(false)

  function onRequest(){
    setNewRequest(prev => !prev)
  }
  function saveVideo(url, handle) {
    const payload = {
      urls: [
        {
          url: url,
          handle: handle,
        },
      ],
    };
    axios({
      method: "POST",
      url: import.meta.env.VITE_ENDPOINT,
      data: payload,
    })
      .then((data) => {
        console.log(data);
        onRequest()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateVideoList(url, handle, id) {
    const payload = {
      urls: [
        {
          url: url,
          handle: handle,
        },
      ],
    };
    axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_ENDPOINT}/${id}`,
      data: payload,
    })
      .then((data) => {
        console.log(data);
        onRequest()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getVideos(id) {
    axios({
      method: "GET",
      url: import.meta.env.VITE_ENDPOINT + "/" + id,
    })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  return (
    <AxiosContext.Provider value={{ saveVideo, updateVideoList, getVideos, videos, newRequest }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export { AxiosContextProvider, AxiosContext };
