import GameButton from "./GameButton"

const MediaBoard = (props: { src: string, type: string, onClick: any, id: string }) => {
    switch (props.type) {
        case "AUDIO":
            return <div className="flex flex-col items-center justify-center">
                <audio key={props.src} controls><source src={props.src}></source></audio>
                <div className="mt-8">
                    <GameButton onClick={props.onClick} />
                </div>
            </div>
        case "IMAGE":
            return <div className="flex flex-col items-center justify-center flex-grow w-full h-full">
                <img src={props.src} alt="get internet or something lol" className="object-cover min-w-full min-h-full flex-grow" />
                <div className="absolute bottom-20">
                    <GameButton onClick={props.onClick} />
                </div>
            </div>
        default:
            return <div>You have no input</div>
    }
}

export default MediaBoard