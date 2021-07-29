import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

var MediaBoard = (props: { src: string, type: string }) => {
  switch (props.type) {
    case "audio":
      return <audio controls><source src={props.src}></source></audio>
    case "image":
      return <img src={props.src} alt="get internet or something lol" className="object-contain" />
    default:
      return <div>You have no input</div>
  }
}

var SelectedChoice = (props: { selection?: number }) => (
  (props.selection) ? <div>You selected {props.selection}</div> : null
)

var ScoreBoard = (props: { score: number }) => (
  <div>SCORE: {props.score}</div>
)

var App = () => {
  type appState = {
    selection?: number
    score: number
    media1Link?: string
    media1Type?: string
    media1Id?: string
    media2Link?: string
    media2Type?: string
    media2Id?: string
  }
  var [state, setState] = useState<appState>({ score: 0, media1Link: undefined, media2Link: undefined, selection: undefined });
  var selectChoice = (selectedId: string, unselectedId: string) => {
    console.log("select option with id: " + selectedId + " did not select:" + unselectedId)
    axios.get('http://localhost:8000/score', { params: { selectedId: selectedId, unselectedId: unselectedId } }).then((response: AxiosResponse<boolean>) =>
      getImage(response.data ? state.score + 1 : state.score - 1))
  }

  type mediaResponse = {
    link1: string
    type1: string
    id1: string
    link2: string
    type2: string
    id2: string
  }

  const getImage = (score: number) => axios.get('http://localhost:8000/media')
    .then((response: AxiosResponse<mediaResponse>) =>
      setState((prevState: appState) => {
        return {
          score: score,
          media1Link: response.data.link1,
          media1Type: response.data.type1,
          media1Id: response.data.id1,
          media2Link: response.data.link2,
          media2Type: response.data.type2,
          media2Id: response.data.id2
        }
      }))

  return <div className="flex flex-col w-screen h-screen overflow-hidden items-center">
    {(state.media1Link !== undefined && state.media2Link !== undefined) ?
      <>
        <ScoreBoard score={state.score} />
        <div className="flex w-full h-full">
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <button className="hover:opacity-75" onClick={() => (selectChoice(state.media1Id!, state.media2Id!))}>
              <MediaBoard src={state.media1Link!} type={state.media1Type!} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <button className="hover:opacity-75" onClick={() => (selectChoice(state.media1Id!, state.media2Id!))} >
              <MediaBoard src={state.media2Link!} type={state.media2Type!} />
            </button>
          </div>
        </div>
        <SelectedChoice selection={state.selection} />
      </>
      :
      <button name="submit" className="bg-green-400 rounded-md p-2" onClick={() => getImage(state.score)}>Start Game</button>}
  </div>
};

export default App;
