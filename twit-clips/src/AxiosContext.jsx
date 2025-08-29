import { createContext, useState } from "react";
import axios from "axios";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

const AxiosContext = createContext();

function AxiosContextProvider(props) {
  const [videos, setVideos] = useState();
  const [newRequest, setNewRequest] = useState(false);
  const [response, setResponse] = useState()

  function onRequest() {
    setNewRequest((prev) => !prev);
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
        onRequest();
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
        onRequest();
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

  function deleteVideo(id, video_url) {
    axios({
      method: "DELETE",
      url: import.meta.env.VITE_ENDPOINT + "/" + id + "/" + video_url,
    })
      .then((data) => {
        setResponse(data + "Video Delete");
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  return (
    <AxiosContext.Provider
      value={{
        saveVideo,
        updateVideoList,
        getVideos,
        deleteVideo,
        videos,
        newRequest,
        response
      }}
    >
      {props.children}
    </AxiosContext.Provider>
  );
}

export { AxiosContextProvider, AxiosContext };
