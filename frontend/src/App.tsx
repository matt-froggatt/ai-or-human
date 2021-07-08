import React, { useState } from 'react';
import './App.css';

var MediaBoard = (props: { src: string, type: string}) => {
  switch(props.type) {
    case "audio":
      return <audio controls><source src={props.src}></source></audio>
    case "image":
      return <img src={props.src} alt="get internet or something lol"/>
    default:
      return <div>You have no input</div>
  }
}

var SelectedChoice = (props: { selection?: number }) => (
  (props.selection) ? <div>You selected {props.selection}</div> : null
)

var ScoreBoard = (props: { score: number }) => (
  <div>Score: {props.score}</div>
)

var App = () => {
  type appState = {
    selection?: number
    score: number
  }
  var [state, setState] = useState<appState>({ selection: undefined, score: 0 });
  var selectChoice = (i: number) => {
    console.log("select option " + i)
    var cur = (i === 1) ? state.score + 1 : state.score - 1
    setState({ selection: i, score: cur })

  }

  return <div className="App">
    <header className="App-header">
      <ScoreBoard score={state.score} />
      <div className="flex">
        <div className="flex flex-col">
          <MediaBoard src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" type="audio"/>
          <button name="submit" className="w-96" type="submit" value="1" onClick={() => (selectChoice(1))}>Option 1</button>
        </div>
        <div className="flex flex-col">
          <MediaBoard src="https://i.kym-cdn.com/entries/icons/original/000/030/873/Screenshot_20.jpg" type="image"/>
          <button name="submit" className="w-96" type="submit" value="2" onClick={() => (selectChoice(2))}>Option 2</button>
        </div>
      </div>
      <SelectedChoice selection={state.selection} />
    </header>
  </div>
};

export default App;
