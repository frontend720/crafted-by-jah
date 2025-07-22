import React, { useState, useEffect, useContext } from "react";
import "./Settings.css";
import { RouteContext } from "./ChatContext";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { FaLocationArrow } from "react-icons/fa";
import { IoThumbsUpSharp } from "react-icons/io5";

export default function Settings({ form_toggle, onCloseForm }) {
  const {
    setInstructions,
    setTopP,
    setAssistant,
    temperature,
    setTemperature,
    topP,
    assistant,
    instructions,
    setLatitude,
    setLongitude,
    latitude,
    longitude,
  } = useContext(RouteContext);
  //   const [assistant, setAssistant] = useState("");
  //   const [instructions, setInstructions] = useState("");
  //   const [topP, setTopP] = useState(0.5);
  //   const [temperature, setTemperature] = useState("");
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  function tempChange() {
    if (topP < 0.5) {
      setTemperature("Factual questions & answers");
    } else if (topP > 0.5) {
      setTemperature("Creative writing & conversations");
    } else {
      setTemperature("General Conversations & Brainstorming");
    }
  }

  function getLocation(e) {
    e.preventDefault();
    function success(pos) {
      const crd = pos.coords;
      console.log("Your current location is");
      console.log(`Latitude is: ${crd.latitude}`);
      console.log(`Longitude is: ${crd.longitude}`);
      setLatitude(crd.latitude);
      // setLatitude(84.3831);
      setLongitude(crd.longitude);
      setLat("Lat: "+crd.latitude + ", ")
      setLong("Long: " +crd.longitude)
      // setLongitude(33.7833);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    console.log(
      navigator.geolocation.getCurrentPosition(success, error, options)
    );
  }

  useEffect(() => {
    tempChange();
  }, [topP]);

  return (
    <div style={form_toggle} className="App">
      <form className="settings-form" action="">
        <input
          className="settings-inputs"
          type="text"
          name="assistant"
          value={assistant}
          onChange={(e) => setAssistant(e.target.value)}
          placeholder="Assistant Name"
        />
        <textarea
          className="settings-inputs"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Special Instructions"
          rows="6"
          id=""
        ></textarea>
        <div style={{ height: 100, display: "flex", flexDirection: "column" }}>
          <label className="temp-label" htmlFor="">
            {topP}
          </label>
          <input
            type="range"
            name=""
            id=""
            min="0"
            max="1"
            step="0.1"
            value={topP}
            onChange={(e) => setTopP(e.target.value)}
          />
        </div>
        <button onClick={onCloseForm} className="setting-button">
          close
        </button>
        <div className="response-container">
          <h4>{assistant}</h4>
          <label htmlFor="">{instructions}</label>
          <label className="mode" htmlFor="">
            Mode: {temperature}
          </label>
        </div>
        <div className="location-container">
          <button className="location-button" onClick={getLocation}>
            <label className="location-label" htmlFor="">
              Get Current Location
            </label>
            <FaLocationArrow size="16px" />
          </button>
          {lat=== null ? "" : <IoThumbsUpSharp size="30" color="green" />}
        </div>
        <label style={{marginTop: 16}} htmlFor="">

        {lat}{long}
        </label>
      </form>
    </div>
  );
}
