import React, { useEffect, useContext } from "react";
import "./Settings.css";
import { RouteContext } from "./ChatContext";
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
  
  } = useContext(RouteContext);


  function tempChange() {
    if (topP < 0.5) {
      setTemperature("Factual questions & answers");
    } else if (topP > 0.5) {
      setTemperature("Creative writing & conversations");
    } else {
      setTemperature("General Conversations & Brainstorming");
    }
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
      </form>
    </div>
  );
}
