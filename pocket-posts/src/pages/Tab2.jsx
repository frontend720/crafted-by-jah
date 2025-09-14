import { useContext, useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaTimeDisplay,
} from "media-chrome/react";
import { MediaPlaybackRateButton } from "../StyleSheet";
import ExploreContainer from "../components/ExploreContainer";
import { ThemeContext } from "../ThemeContext";
import "./Tab2.css";
import { FirebaseContext } from "../FirebaseContext";
import { IoClose } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
 import { ImFilm } from "react-icons/im";

const Tab2 = () => {
  const [arr, setArr] = useState(0);
  const [videoIndex, setVideoIndex] = useState([]);
  const { collectionArr, getMedia } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [seek, setSeek] = useState(0);
  const [auto, setAuto] = useState(false);

  function isAutoPlaying() {
    setAuto((prev) => !prev);
  }

  useEffect(() => {
    getMedia()
  }, [])

  const playbackRate = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2,
  ];
  const [rate, setRate] = useState(9);
  function changePlaybackRate() {
    setRate((prev) => (prev + 1) % playbackRate.length);
  }

  //   function optionChange() {
  //   setRate((prev) => (prev + 1) % playbackRate.length);
  // }

  function nextVideo() {
    setSeek((prev) => prev + 1);
  }
  function lastVideo() {
    setSeek((prev) => (prev - 1) % collectionArr?.length);
  }

  const mediaControllerRef = useRef(null);
  const reactPlayerRef = useRef(null);

  function handlePlayerReady() {
    const interal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = interal;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={theme ? "toolbar-dark" : "toolbar-light"}>
          <IonTitle>{collectionArr[seek]?.username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className={theme ? "content-dark" : "content-light"}
      >
        <IonHeader collapse="condense">
          <IonToolbar className={theme ? "content-dark" : "content-light"}>
            <IonTitle
              style={theme ? { color: "#444444" } : { color: "#dadada" }}
              size="large"
            >
              {collectionArr[seek]?.username}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {collectionArr.length === 0 ? 
          <div className={theme ? "card" : "card-dark"}>
        <p>Save some tweets to view them here</p>
       <ImFilm color={theme ? "#444444" : "#dadada"} size=" 60px" />
      </div>
     : 
    <>
        <MediaController>
          <ReactPlayer
            slot="media"
            width="100vw"
            height="500px"
            src={collectionArr[seek]?.post}
            ref={reactPlayerRef}
            onReady={handlePlayerReady}
            playbackRate={playbackRate[rate]}
            onEnded={auto ? nextVideo : undefined}
            playing={auto}
            controls={false}
          />
          <MediaControlBar>
            <MediaPlaybackRateButton
              disabled={seek === 0 ? true : false}
              // style={seek === 0 ? { opacity: 0 } : { opacity: 1 }}
              onClick={lastVideo}
            >
              <GrPrevious style={seek === 0 ? { opacity: 0 } : { opacity: 1 }} />
            </MediaPlaybackRateButton>
            <MediaPlayButton />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaPlaybackRateButton onClick={changePlaybackRate}>
              {playbackRate[rate]} <IoClose />
            </MediaPlaybackRateButton>
            <MediaMuteButton />
            <MediaVolumeRange />
            <MediaPlaybackRateButton
              style={
                seek === collectionArr.length - 1
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              onClick={nextVideo}
              disabled={seek === collectionArr.length - 1 ? true : false}
            >
              <GrNext />
            </MediaPlaybackRateButton>
          </MediaControlBar>
        </MediaController>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{
              padding: 6,
              background: "#292929ff",
              borderRadius: 6,
              margin: "12px 0px",
            }}
            onClick={isAutoPlaying}
          >
            <label
              style={{ fontSize: 16, color: "#e8e8e8" }}
              htmlFor=""
            >{`Turn ${auto ? "off" : "on"} autoplay`}</label>
          </button>
          <label
            style={theme ? { color: "#444444" } : { color: "#dadada" }}
            className={collectionArr.length === 0 ? "count-label-hidden" : "count-label-visible"}
            htmlFor=""
          >
            {seek + 1} of {collectionArr?.length}
          </label>
        </div>
    
    </>
      }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
