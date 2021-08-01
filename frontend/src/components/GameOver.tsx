type GameOverProps = {
    onClick: any
    score: number
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => <div style ={{textAlign: "center"}}>
      <div>You lose! Your score is: {props.score}</div>
      <button onClick={props.onClick}>Back To Home</button>
    </div>

export default GameOver