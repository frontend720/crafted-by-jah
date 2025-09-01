import { useState, useRef, useContext, useEffect } from "react";
import { Card, CardContent, CardActions, Box } from "@mui/material";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaSearch, FaRegHeart, FaTwitter } from "react-icons/fa";
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
import { AxiosContext } from "./AxiosContext";
import { APIContext } from "./APIContext";
import { AuthContext } from "./AuthContext";

dayjs.extend(relativeTime);

function NewSearch({ visibility }) {
  return (
    <div style={visibility} className="input-container">
      <form className="new-search-form" action="">
        <h1 style={{ fontWeight: 300, letterSpacing: 3 }}>
          Welcome to TwitClippy
        </h1>
        <p className="welcome-subtitle">
          Enter a Twitter username in the navigation tab to browse and save
          their video clips.
        </p>
      </form>
    </div>
  );
}

export default function Search() {
  const { user } = useContext(AuthContext);
  const { saveVideo, getVideos, videos, updateVideoList, newRequest } =
    useContext(AxiosContext);
  const {
    tweetList,
    continueTweetRequests,
    continuationToken,
    error,
  } = useContext(APIContext);

  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, __________] = useState(false);

  function saveChange() {
    setIsSaved((prev) => !prev);
  }

  const reactPlayerRef = useRef(null);
  const mediaControllerRef = useRef(null);

  function handlePlayerReady() {
    const internal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = internal;
    }
  }

  useEffect(() => {
    getVideos(user);
  }, [newRequest]);

  console.log(continuationToken);

  console.log(error);

  return (
    <div style={{ paddingTop: 20 }}>
      {/* <NewSearch
        visibility={
          tweetList.length === 0 ? { display: "" } : { display: "none" }
        }
      /> */}
      {tweetList.length === 0 && !error && <NewSearch />}
      {error && (
        <div className="welcome-container">
          <h2 className="error-title">Error</h2>
          <p className="error-subtitle">{error}</p>
          <p className="welcome-subtitle">Please try a different username.</p>
        </div>
      )}

      {!error &&
        tweetList?.map((tweet) => (
          <>
            <Card
              className="card"
              style={
                tweet.video_url === null || tweet.video_url.length <= 0
                  ? { display: "none" }
                  : { display: "" }
              }
              key={tweet.tweet_id}
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
                  <MediaController className="resizable-media-container">
                    <ReactPlayer
                      slot="media"
                      width="100%"
                      height="100%"
                      className="react-player"
                      src={tweet.video_url?.[tweet.video_url.length - 1]?.url}
                      playbackRate={1}
                      ref={reactPlayerRef}
                      onReady={handlePlayerReady}
                      playing={isPlaying}
                    />
                    <MediaControlBar>
                      <MediaPlayButton />
                      <MediaTimeRange />
                      <MediaTimeDisplay showDuration />
                      <MediaMuteButton />
                      <MediaVolumeRange />
                      <MediaFullscreenButton />
                    </MediaControlBar>
                  </MediaController>
                </Box>
              </CardContent>
              <p className="tweet-text" htmlFor="">
                {tweet.text}
              </p>
              <CardActions>
                <div className="save-container">
                  <label
                    style={
                      tweet.video_url === null || tweet.video_url.length <= 0
                        ? { display: "none" }
                        : { display: "" }
                    }
                    htmlFor=""
                    className="timestamp"
                  >
                    {dayjs(tweet.creation_date).fromNow()}
                  </label>
                  <div
                    onClick={
                      videos?.data?.urls.length === 0
                        ? () =>
                            saveVideo(
                              tweet.video_url?.[tweet.video_url.length - 1]
                                ?.url,
                              tweet.user.username
                            )
                        : () =>
                            updateVideoList(
                              tweet.video_url?.[0]?.url,
                              tweet.user.username,
                              user
                            )
                    }
                  >
                    <FaRegHeart
                      onClick={saveChange}
                      color={isSaved ? "#ffffff" : "#ffffff"}
                      size="24px"
                    />
                  </div>
                </div>
              </CardActions>
            </Card>
          </>
        ))}
      <button
        style={
          tweetList.length === 0 ? { display: "none" } : { width: "100vw" }
        }
        onClick={continueTweetRequests}
        disabled={!continuationToken}
        className="continue-btn"
      >
        Continue Tweets
      </button>
    </div>
  );
}
