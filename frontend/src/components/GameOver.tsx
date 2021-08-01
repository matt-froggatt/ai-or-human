type GameOverProps = {
    onClick: any
    score: number
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => 
    <div className="flex flex-col justify-center h-full w-full" style ={{textAlign: "center"}}>
        <div className="text-5xl"> Your score is: {props.score}</div>
        <button className="bg-green-400 rounded-md p-2 text-center w-xl" onClick={props.onClick}>Play Again</button>
    </div>

export default GameOver