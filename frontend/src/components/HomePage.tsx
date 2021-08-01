type HomePageProps = {
    onClick: any
}

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) =>
    <div className="flex flex-col justify-center items-center w-full h-full bg-center" style={{backgroundImage: 'url("https://www.incimages.com/uploaded_files/image/1920x1080/getty_817338718_329077.jpg")'}}>
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-md">
            <h1 className="text-center text-5xl text-black p-2"> AI or Not?</h1>  
            <button name="submit" className="bg-green-400 justify-center text-white rounded-full px-6 py-3 text-center w-auto hover:bg-green-600 hover:text-gray-200" onClick={props.onClick}>Start Game</button>
            <h2 className="text-center text-3xl text-black p-2"> Instructions: Select the artpiece that you think an AI created.</h2>
        </div>
    </div>

export default HomePage