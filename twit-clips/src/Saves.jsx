import { useContext, useState, useRef, useEffect } from "react";
import { Card, CardContent, CardActions, Box } from "@mui/material";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import ReactPlayer from "react-player";
import { AxiosContext } from "./AxiosContext";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

export default function Saves() {
  const { videos, getVideos, deleteVideo, response } = useContext(AxiosContext);

  const speed = [1, 0.75, 0.5, 0.25, 0.1];
  const [option, setOption] = useState(0);
  function optionChange() {
    setOption((prev) => (prev + 1) % speed.length);
  }

  const collection_id = "68af3df67ca71283a9b13406";

  function next() {
    setSeek((prev) => prev + 1);
  }

  function prev() {
    setSeek((prev) => prev - 1);
  }

  useEffect(() => {
    getVideos(collection_id);
  }, [response]);

  const reactPlayerRef = useRef(null);
  const mediaControllerRef = useRef(null);

  function handlePlayerReady() {
    const internal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = internal;
    }
  }

  const [auto, setAuto] = useState(false);

  function isAutoPlay() {
    setAuto((prev) => !prev);
  }

  const reversedUrls = [...(videos?.data?.urls || [])].reverse();
  const [seek, setSeek] = useState(0);
  
  if (!videos?.data?.urls) {
    return (
      <div className="loading-message">
        <Card style={{width: "90%"}} className="card">
          <CardContent>
            <Box>
              <h2 style={{color: "#f7f7f7"}}>Loading Library</h2>
              <p style={{color: "#f7f7f7"}}>Please Wait</p>
            </Box>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card className="card">
        <CardContent>
          <Box
            sx={{
              width: "100%",
              my: 2,
            }}
            className="player-container-box"
          >
            <MediaController className="resizable-media-container">
              <ReactPlayer
                slot="media"
                width="100%"
                height="100%"
                className="react-player"
                src={reversedUrls[seek]?.url}
                ref={reactPlayerRef}
                onReady={handlePlayerReady}
                playbackRate={speed[option]}
                onEnded={auto ? next : ""}
                playing={auto}
              />
              <MediaControlBar>
                <button
                  disabled={seek === 0 ? true : false}
                  className="media-control-button"
                  onClick={prev}
                >
                  <MdSkipPrevious
                    style={seek === 0 ? { opacity: 0 } : { opacity: 1 }}
                    color="#ffffff"
                  />
                </button>
                <MediaPlayButton />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <button
                  disabled={
                    seek === videos?.data?.urls.length - 1 ? true : false
                  }
                  className="media-control-button"
                  onClick={next}
                >
                  <MdSkipNext
                    style={
                      seek === videos?.data?.urls.length - 1
                        ? { opacity: 0 }
                        : { opacity: 1 }
                    }
                  />
                </button>
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>
          </Box>
        </CardContent>
        <CardActions>
          <div className="name-container" style={{ width: "100vw" }}>
            <div></div>
            <label className="saved-user-handle" htmlFor="">
              {reversedUrls[seek]?.handle}
            </label>
            <div
              onClick={() => deleteVideo(collection_id, reversedUrls[seek]._id)}
            >
              <FaTrashCan color="#fff" />
            </div>
          </div>
        </CardActions>
        <div style={{ textAlign: "center" }}>
          <button className="playback-rate-button" onClick={optionChange}>
            {speed[option]}
          </button>
        </div>
      </Card>
      <div className="auto-play-button-container">
        <label>{seek + 1 + " of " + videos.data.urls.length}</label>
        <button className="auto-play-button" onClick={isAutoPlay}>
          Turn auto play {auto ? "OFF" : "ON"}
        </button>
      </div>
    </div>
  );
}
