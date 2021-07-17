import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './App.css';

var MediaBoard = (props: { src: string, type: string }) => {
  switch (props.type) {
    case "audio":
      return <audio controls><source src={props.src}></source></audio>
    case "image":
      return <img src={props.src} alt="get internet or something lol" />
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
    left?: string
    right?: string
  }
  var [state, setState] = useState<appState>({ score: 0, left: undefined, right: undefined });
  var selectChoice = (i: number) => {
    console.log("select option " + i)
    var cur = (i === 1) ? state.score + 1 : state.score - 1
    getImage(cur)
  }

  const getImage = (score: number) => axios.get('http://localhost:8000/media')
    .then((response: AxiosResponse<string>) => 
    setState((prevState: appState) => {return { score: score, left: response.data, right: response.data }}))

  return <div className="App">
  {(state.left !== undefined && state.right !== undefined)?
    <header className="App-header">
      <ScoreBoard score={state.score} />
      <div className="flex">
        <div className="flex flex-col">
          <MediaBoard src={state.left!} type="audio" />
          <button name="submit" className="w-96" type="submit" value="1" onClick={() => (selectChoice(1))}>Option 1</button>
        </div>
        <div className="flex flex-col">
          <MediaBoard src={state.right!} type="image" />
          <button name="submit" className="w-96" type="submit" value="2" onClick={() => (selectChoice(2))}>Option 2</button>
        </div>
      </div>
      <SelectedChoice selection={state.selection} />
    </header>
    :
    <button name="submit" className="bg-green-400 rounded-md p-2" onClick={() => getImage(state.score)}>Start Game</button>}
  </div>
};

export default App;
