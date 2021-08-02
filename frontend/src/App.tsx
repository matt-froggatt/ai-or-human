import { useState } from 'react';
import axios from 'axios';
import Game from './components/Game';
import Media from './types/Media';
import GameOver from './components/GameOver';
import HomePage from './components/HomePage';

const host = "https://ai-or-not.herokuapp.com"

const App = () => {
  type AppState = {
    selection?: number
    score: number
    media1?: Media
    media2?: Media
  }
  const [state, setState] = useState<AppState>({ score: 0, media1: undefined, media2: undefined, selection: undefined });
  const [finished, setFinished] = useState<boolean>(false);

  const startGame = () => {
    setState((prevState) => ({...prevState, score: 0}));
    getImage();
  }

  const selectChoice = async (selectedId: string, unselectedId: string) => {
    const response = await axios.get<boolean>(`${host}/score`, { params: { selectedId: selectedId, unselectedId: unselectedId } });
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
    const response = await axios.get<[Media, Media]>(`${host}/media`);
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

  return (state.media1 !== undefined && state.media2 !== undefined) ?
      <Game media1={state.media1} media2={state.media2} score={state.score} onSelectChoice={selectChoice}/>
      :
      <HomePage onClick={startGame}/>
};

export default App;