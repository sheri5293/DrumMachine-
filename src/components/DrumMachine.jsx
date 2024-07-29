/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/DrumMachine.css";

const drumPads = [
  {
    triggerKey: "Q",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    soundName: "Heater 1",
  },
  {
    triggerKey: "W",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    soundName: "Heater 2",
  },
  {
    triggerKey: "E",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    soundName: "Heater 3",
  },
  {
    triggerKey: "A",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    soundName: "Heater 4",
  },
  {
    triggerKey: "S",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    soundName: "Clap",
  },
  {
    triggerKey: "D",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    soundName: "Open HH",
  },
  {
    triggerKey: "Z",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    soundName: "Kick n' Hat",
  },
  {
    triggerKey: "X",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    soundName: "Kick",
  },
  {
    triggerKey: "C",
    audioUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    soundName: "Closed HH",
  },
];

const DrumMachine = () => {
  const [displayText, setDisplayText] = useState("");
  const handleClick = (triggerKey) => {
    const pad = drumPads.find((pad) => pad.triggerKey === triggerKey);
    if (pad) {
      const audio = document.getElementById(triggerKey);
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((e) => {
          console.error("Error playing audio:", e);
        });
      }
    }
    setDisplayText(pad.soundName);
  };

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    const pad = drumPads.find((pad) => pad.triggerKey === key);
    if (pad) {
      handleClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  return (
    <div id="drum-machine">
      <div id="display"> {displayText} </div>
      <div id="drum-pads">
        {drumPads.map((pad) => (
          <div
            key={pad.triggerKey}
            className="drum-pad"
            id={pad.soundName.replace(/\s+/g, "-").toLowerCase()}
            onClick={() => handleClick(pad.triggerKey)}
          >
            <audio className="clip" id={pad.triggerKey} src={pad.audioUrl} />
            {pad.triggerKey}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DrumMachine;
