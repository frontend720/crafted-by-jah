import { useState, useRef, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ReactPlayer from "react-player";
import tweets from "../tweets.json";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoPlay, IoPause } from "react-icons/io5";
import { BsFillSave2Fill } from "react-icons/bs";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import { AxiosContext } from "./AxiosContext";

dayjs.extend(relativeTime);

export default function Search() {
  const { saveVideo, getVideos, videos, updateVideoList, newRequest } = useContext(AxiosContext)
  console.log(newRequest)
  const [playback, setPlayback] = useState(50);


  const reactPlayerRef = useRef(null);
  const mediaControllerRef = useRef(null);

  function handlePlayerReady() {
    const internal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = internal;
    }
  }

  // console.log(
  //   tweets.results.map((tweet) =>
  //     tweet.extended_entities?.media?.map((url) => url.media_url_https)
  //   )
  // );

  useEffect(() => {
   getVideos("68af3df67ca71283a9b13406")
  }, [newRequest])

  console.log(videos?.data?.urls)

  return (
    <div>
      <input type="range" name="playback" value={playback} onChange={(e) => setPlayback(e.target.value)} id="" />
      
      {tweets?.results.map((tweet) => (
        <>
          <Card
            className="card"
            style={
              tweet.video_url === null || tweet.video_url.length <= 0
                ? { display: "none" }
                : { display: "" }
            }
          >
            <CardContent>
              <label className="username" htmlFor="">
                {tweet.user.username}
              </label>
              <Box
                sx={{
                  width: "100%",
                  my: 2,
                }}
                className="player-container-box" 
              >
                <MediaController
                  // style={{
                  //   width: "100%",
                  //   aspectRatio: "16/9",
                  // }}
                  className="resizable-media-container"
                >
                  <ReactPlayer
                    slot="media"
                    width="100%"
                    height="100%"
                    className="react-player"
                    src={tweet.video_url?.map((video) => video.url)}
                    playbackRate={playback / 100}
                    ref={reactPlayerRef}
                    onReady={handlePlayerReady}
                   
                    
                  />
                  <MediaControlBar>
                    <MediaPlayButton />
                    <MediaSeekBackwardButton seekOffset={10} />
                    <MediaSeekForwardButton seekOffset={10} />
                    <MediaTimeRange />
                    <MediaTimeDisplay showDuration />
                    <MediaMuteButton />
                    <MediaVolumeRange />
                    <MediaFullscreenButton />
                  </MediaControlBar>
                </MediaController>
              </Box>
            </CardContent>
            <CardActions>
              <div className="save-container">

          <label   style={
              tweet.video_url === null || tweet.video_url.length <= 0
                ? { display: "none" }
                : { display: "" }
            } htmlFor="" className="timestamp">
            {dayjs(tweet.creation_date).fromNow()}
          </label>
          <div onClick={videos?.data?.urls.length === 0 ? () => saveVideo(tweet.video_url?.[0]?.url, tweet.user.username) : () => updateVideoList(tweet.video_url?.[0]?.url, tweet.user.username, "68af3df67ca71283a9b13406")}>
          <BsFillSave2Fill color="#ffffff" size="24px" />
          </div>
              </div>
            </CardActions>
          </Card>
        </>
      ))}
    </div>
  );
}
