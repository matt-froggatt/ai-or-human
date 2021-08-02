type GameOverProps = {
    onClick: any
    score: number
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) =>
    <div className="flex flex-col justify-center items-center h-full w-full bg-black font-pixel text-red-700" >
        <h1 className="text-5xl"> GAME OVER</h1>
        <p className="text-xl"> Your score is: {props.score}</p>
        <button name="submit" className="mt-4 border-2 border-green-600 justify-center text-green-600 rounded-full px-6 py-3 text-center w-auto hover:bg-green-600 hover:text-gray-200" onClick={props.onClick}>Play Again</button>
    </div>

export default GameOver