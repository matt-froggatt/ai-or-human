import React, { useState } from 'react';
import axios from 'axios';

const MediaBoard = (props: { src: string, type: string }) => {
  switch (props.type) {
    case "AUDIO":
      return <audio controls><source src={props.src}></source></audio>
    case "IMAGE":
      return <img src={props.src} alt="get internet or something lol" className="object-contain" />
    default:
      return <div>You have no input</div>
  }
}

const SelectedChoice = (props: { selection?: number }) => (
  (props.selection) ? <div>You selected {props.selection}</div> : null
)

const ScoreBoard = (props: { score: number }) => (
  <div>SCORE: {props.score}</div>
)

const App = () => {
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
  const [state, setState] = useState<appState>({ score: 0, media1Link: undefined, media2Link: undefined, selection: undefined });
  const [finished, setFinished] = useState<boolean | undefined>(undefined);

  const startGame = () => {
    setState((prevState) => ({...prevState, score: 0}));
    getImage();
  }

  const selectChoice = async (selectedId: string, unselectedId: string) => {
    const response = await axios.get<boolean>(`https://ai-or-not.herokuapp.com/score`, { params: { selectedId: selectedId, unselectedId: unselectedId } });
    console.log(response.data);
    if (response.data)
    {
      setState((prevState) => {
        return {...prevState, score: prevState.score + 1}
      });
      await getImage();
    } else {
      setFinished(true);
    }
  }

  type mediaResponse = {
    link1: string
    type1: string
    id1: string
    link2: string
    type2: string
    id2: string
  }

  // console.log(`${process.env.REACT_APP_API}/media`)

  const getImage = async () => {
    const response = await axios.get<mediaResponse>(`https://ai-or-not.herokuapp.com/media`);
    setState((prevState: appState) => {
      return {
        ...prevState,
        media1Link: response.data.link1,
        media1Type: response.data.type1,
        media1Id: response.data.id1,
        media2Link: response.data.link2,
        media2Type: response.data.type2,
        media2Id: response.data.id2
      }
    });
  }
  
  // axios.get(`https://ai-or-not.herokuapp.com/media`)
  //   .then((response: AxiosResponse<mediaResponse>) =>
  //     setState((prevState: appState) => {
  //       return {
  //         score: score,
  //         media1Link: response.data.link1,
  //         media1Type: response.data.type1,
  //         media1Id: response.data.id1,
  //         media2Link: response.data.link2,
  //         media2Type: response.data.type2,
  //         media2Id: response.data.id2
  //       }
  //     }))

  const backToHome = () => {
    setFinished(false);
    setState((prevState) => {
      return {...prevState, media1Link: undefined, media2Link: undefined}
    });
  }

  if (finished) {
    return (<div style ={{textAlign: "center"}}>
      <div>You lose! Your score is: {state.score}</div>
      <button onClick={backToHome}>Back To Home</button>
    </div>)
  }

  return <div className="flex flex-col w-screen h-screen overflow-hidden items-center">
    {(state.media1Link !== undefined && state.media2Link !== undefined) ?
      <>
        <ScoreBoard score={state.score} />
        <div className="flex w-full h-full">
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <div className="hover:opacity-75">
              <MediaBoard src={state.media1Link!} type={state.media1Type!} />
              <button onClick={() => {selectChoice(state.media1Id!, state.media2Id!)}} style={{color: 'white'}}>Select 1</button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <div className="hover:opacity-75">
              <MediaBoard src={state.media2Link!} type={state.media2Type!} />
              <button onClick={() => {selectChoice(state.media2Id!, state.media1Id!)}} style={{color: 'white'}}>Select 2</button>
            </div>
          </div>
        </div>
        <SelectedChoice selection={state.selection} />
      </>
      :
      <button name="submit" className="bg-green-400 rounded-md p-2" onClick={startGame}>Start Game</button>}
  </div>
};

export default App;
