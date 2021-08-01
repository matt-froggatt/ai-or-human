import MediaBoard from "./MediaBoard"

const Game = (props: any) => <>
    <div className="flex w-full h-full">
        <div className="absolute left-1/2">
            <div className="relative -left-1/2 text-5xl p-4 text-white">SCORE: {props.score}</div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
            <MediaBoard src={props.media1.link!} type={props.media1.type!} onClick={() => props.onSelectChoice(props.media1!.id, props.media2!.id)}/>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full bg-gradient-to-t from-yellow-400 via-red-500 to-pink-500">
            <MediaBoard src={props.media2.link!} type={props.media2.type!} onClick={() => props.onSelectChoice(props.media2!.id, props.media1!.id)}/>
        </div>
        <div className="absolute left-1/2 bottom-1/2">
            <span className="relative -left-1/2 -bottom-1/2 rounded-full bg-white p-6 text-3xl text-black">OR</span>
        </div>
    </div>
</>

export default Game