type HomePageProps = {
    onClick: any
}

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) =>
    <div className="flex flex-col justify-center w-full h-full object-cover" style={{backgroundImage: 'url("https://www.incimages.com/uploaded_files/image/1920x1080/getty_817338718_329077.jpg")'}}>
        <h1 className="text-center text-5xl text-white"> AI or Not?</h1>  
        <button name="submit" className="bg-green-400 rounded-md p-2 text-center w-xl" onClick={props.onClick}>Start Game</button>
        <h2 className="text-center text-3xl text-red-50"> Instructions: Select the artpiece that you think an AI created.</h2>
    </div>

export default HomePage