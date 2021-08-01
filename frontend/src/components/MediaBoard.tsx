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

export default MediaBoard