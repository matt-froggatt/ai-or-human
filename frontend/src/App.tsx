import { useState } from 'react';
import axios from 'axios';
import Game from './components/Game';
import Media from './types/Media';
import GameOver from './components/GameOver';
import HomePage from './components/HomePage';

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

  return <div className="w-screen h-screen overflow-hidden">
    {(state.media1 !== undefined && state.media2 !== undefined) ?
      <Game media1={state.media1} media2={state.media2} score={state.score} onSelectChoice={selectChoice}/>
      :
      <HomePage onClick={startGame}/>}
  </div>
};

export default App;