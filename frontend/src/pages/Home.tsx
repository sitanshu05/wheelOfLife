import MainTitle from "../components/MainTitle"
import Nav from "../layouts/Header";
import homeImage from "../assets/images/home_image.png"
import StartButton from "../components/StartButton"

const Home = () => {
    return (
    <div className="flex flex-col justify-center items-center overflow-hidden	">

        <Nav/>

        <MainTitle title="Wheel Of Life"/>

        <p className="font-simple_text font-normal text-center mt-2 mx-5 leading-7 tracking-wider ">
        The Wheel of Life represents the various dimensions of a fulfilling existence, from career to relationships. It emphasizes balance and reflection as individuals strive for harmony in their life's journey.
        </p>
        
        <img src={homeImage} alt="" className="w-11/12"/>
       
        <div className="w-80 mt-2">
            <StartButton text = "Get Started" path ="/soul" />
        </div>
        
    </div>
    )
    
}

export default Home