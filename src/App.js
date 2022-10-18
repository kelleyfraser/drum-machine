import './App.scss';
import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import audioSprite from './audioSprite.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

const DATA = [
  { letter: 'Q',
    id_1: "Drum-1",
    id_2: "Chord-1",
  },
  { letter: 'W',
    id_1: "FX-4",
    id_2: "g3",
  },
  { letter: 'E',
    id_1: "bd-soft",
    id_2: "e6",
  }, 
  { letter: 'A',
    id_1: "bd-hard",
    id_2: "f6",
  },
  { letter: 'S',
    id_1: "Drum-2",
    id_2: "g6",
  },
  { letter: 'D',
    id_1: "Crash",
    id_2: "b6",
  },
  { letter:'Z',
    id_1: "Bass",
    id_2: "c7",
  },
  { letter: 'X',
    id_1: "Midtom",
    id_2: "Chord-2",
  },
  { letter: 'C',
    id_1: "Boing",
    id_2: "Chord-3",
  } 
]

function App() {
  const [isActive, setActive] = useState(false);
  const [display, setDisplay] = useState("--DRUM MACHINE--");
  const [volume, setVolume] = useState(0.5);
  const focus = React.useRef(null);
  const [isOn, toggleOn] = useState(false);
  const [playSound] = useSound(audioSprite, { volume: volume, 
    sprite: {
      "Drum-1": [0, 580],
      "FX-4": [595, 245],
      "bd-soft": [850, 225],
      "bd-hard": [1125, 240],
      "Drum-2": [1455, 165],
      "Crash": [1635, 904],
      "Bass": [2589, 70],
      "Midtom": [2749, 390],
      "Boing": [3157, 535],
      "Chord-1": [3721, 308],
      "g3": [4083, 242],
      "e6": [4535, 380],
      "f6": [4930, 395],
      "g6": [5390, 355],
      "b6": [5772, 355],
      "c7": [6150, 340],
      "Chord-2": [6495, 405],
      "Chord-3": [7120, 350]
    }, 
  });

  React.useEffect(() => {
    focus.current.focus();
  }, []);

  const handlePowerOn = () => {
    toggleOn(!isOn);
    isOn ? setDisplay("--DRUM MACHINE--") : setDisplay("");
  }

  const handleToggle = () => {
    if (!isOn) {
      setTimeout(() => {
        setActive(!isActive);
        isActive ? setDisplay("Drum Kit") : setDisplay("Piano Kit");
      }, 200);
    }
  }
  
  const handleClick = (e) => {
    if (!isOn) {
      let bank = isActive ? "id_2" : "id_1";
      let key = e.target.innerText;
      let object = (DATA.find(obj => obj.letter === key));
      setDisplay(object[bank]);
      playSound({id: object[bank]});
    }

  }

  const handleKeyDown = (e) => {
    if (!isOn) {
      let bank = isActive ? "id_2" : "id_1";
      let key = e.key.toUpperCase();
      let object = (DATA.find(obj => obj.letter === key));
      setDisplay(object[bank]);
      playSound({id: object[bank]});
    }
  }

  return (
    <div className="App" ref={focus} tabIndex={-1} onKeyDown={handleKeyDown}>
      <div id="drum-machine">

        <div className="controls">
          <div id="buttons">
            <div className="btn" id="power" onClick={handlePowerOn}>
              <FontAwesomeIcon className="icon" icon={ faPowerOff } />
            </div>
            <div className="btn" id="bank">
              <p>Bank: </p>
              <div className="select">
                <div id="inner" className={isActive ? "inner-clicked" : null} onClick={handleToggle}></div>
              </div>
            </div>
          </div>
          <div className="slider" id="volume">
            <label>Volume: </label>
            <input type="range" step="0.01" min="0" max="1" value={volume} onChange={(e) => { setVolume(e.target.value); setDisplay(Math.floor((e.target.value) * 100))}}></input>
          </div>
        </div>

        <div id="display">{display}</div>

        <div className="pad-bank" >
          <div className="drum-pad" iqwd="" onClick={handleClick}>Q</div>
          <div className="drum-pad" id="" onClick={handleClick}>W</div>
          <div className="drum-pad" id="" onClick={handleClick}>E</div>
          <div className="drum-pad" id="" onClick={handleClick}>A</div>  
          <div className="drum-pad" id="" onClick={handleClick}>S</div>
          <div className="drum-pad" id="" onClick={handleClick}>D</div>
          <div className="drum-pad" id="" onClick={handleClick}>Z</div>
          <div className="drum-pad" id="" onClick={handleClick}>X</div>
          <div className="drum-pad" id="" onClick={handleClick}>C</div>
        </div>  
      </div>
    </div>
  );
}

export default App;
