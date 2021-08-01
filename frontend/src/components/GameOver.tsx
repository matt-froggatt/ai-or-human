type GameOverProps = {
    onClick: any
    score: number
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) =>
    <div className="flex flex-col justify-center items-center h-full w-full bg-yellow-900 bg-center"  style={{backgroundImage: 'url("https://www.incimages.com/uploaded_files/image/1920x1080/getty_817338718_329077.jpg")'}}>
        <div className="flex flex-col justify-center items-center p-8 bg-white rounded-md">
            <h1 className="text-5xl"> GAME OVER</h1>
            <p className="text-xl"> Your score is: {props.score}</p>
            <button name="submit" className="mt-4 bg-green-400 justify-center text-white rounded-full px-6 py-3 text-center w-auto hover:bg-green-600 hover:text-gray-200" onClick={props.onClick}>Play Again</button>
        </div>
    </div>

export default GameOver