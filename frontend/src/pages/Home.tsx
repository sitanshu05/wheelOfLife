import MainTitle from "../components/MainTitle"
import Header from "../layouts/Header";
import Button from "../components/Button"
import Lottie from "lottie-react"
import homeImageData from "../data/lottie/hero.json"
const Home = () => {
    return (
        <div className="ml-2 lg:ml-0">
            <div className="mb-4 lg:mb-20 ml-[-0.5rem]"><Header/></div>
            <div className="w-full flex justify-center">
                <div className="lg:flex lg:justify-between lg:w-full items-center max-w-[1200px]" id="1">
                    <div className="flex flex-col justify-center md:ml-5">
                        <div className="mb-1">
                            <MainTitle title={["Wheel Of","Life"]}/>
                        </div>
                        <div className="mb-8 lg:ml-1">
                            <p className="text-left w-full text-xl md:text-3xl tracking-wide text-font_brown font-body_font dark:text-white ">Find who you are in the here <br></br>and now</p>
                        </div>
                        <div className="w-4/5">
                            <Button text = "Get Started" path ="/soul" />
                        </div>
                    </div>
            
                    <div className="w-11/12 ml-5 max-w-[540px] sm:ml-20 md:ml-44 lg:ml-0">
                        <Lottie animationData={homeImageData} className="w-full z-0"/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Home