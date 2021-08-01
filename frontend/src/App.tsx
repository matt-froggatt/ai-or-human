import React, { useState } from 'react';
import axios from 'axios';
import MediaBoard from './components/MediaBoard';
import ScoreBoard from './components/ScoreBoard';
import Media from './types/Media';
import GameOver from './components/GameOver';

const App = () => {
  type AppState = {
    selection?: number
    score: number
    media1?: Media
    media2?: Media
  }
  const [state, setState] = useState<AppState>({ score: 0, media1: undefined, media2: undefined, selection: undefined });
  const [finished, setFinished] = useState<boolean | undefined>(undefined);

  const startGame = () => {
    setState((prevState) => ({...prevState, score: 0}));
    getImage();
  }

  const selectChoice = async (selectedId: string, unselectedId: string) => {
    const response = await axios.get<boolean>(`http://localhost:8000/score`, { params: { selectedId: selectedId, unselectedId: unselectedId } });
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

  const getImage = async () => {
    const response = await axios.get<[Media, Media]>(`http://localhost:8000/media`);
    setState((prevState: AppState) => {
      return {
        ...prevState,
        media1: response.data[0],
        media2: response.data[1]
      }
    });
  }

  const backToHome = () => {
    setFinished(false);
    setState((prevState) => {
      return {...prevState, score: 0, media1: undefined, media2: undefined}
    });
  }

  if (finished) {
    return (<GameOver onClick={backToHome} score={state.score}/>)
  }

  return <div className="flex flex-col w-screen h-screen overflow-hidden items-center">
    {(state.media1 !== undefined && state.media2 !== undefined) ?
      <>
        <ScoreBoard score={state.score} />
        <div className="flex w-full h-full">
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <div className="hover:opacity-75">
              <MediaBoard src={state.media1.link!} type={state.media1.type!} />
              <button onClick={() => {selectChoice(state.media1!.id, state.media2!.id)}} style={{color: 'white'}}>Select 1</button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black">
            <div className="hover:opacity-75">
              <MediaBoard src={state.media2.link!} type={state.media2.type!} />
              <button onClick={() => {selectChoice(state.media2!.id, state.media1!.id)}} style={{color: 'white'}}>Select 2</button>
            </div>
          </div>
        </div>
      </>
      :
      <button name="submit" className="bg-green-400 rounded-md p-2" onClick={startGame}>Start Game</button>}
  </div>
};

export default App;
