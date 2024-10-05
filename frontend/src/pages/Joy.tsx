import Question from "../layouts/Question"
import joy from "../data/lottie/joy.json"
import joy_dark from "../data/lottie/joy_dark.json"
import { useRecoilState, useRecoilValue } from "recoil"
import { joyAtom } from "../data/atoms/joyAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"
import { darkModeAtom } from "../data/atoms/darkModeAtom"

const Joy : React.FunctionComponent = () => {

    const content = "Seek happiness every day! Highlight the importance of cultivating joy and gratitude in your life, encouraging you to find delight in the small moments and cherish the beauty around you."

    const [joyValues, setJoyValues] = useRecoilState(joyAtom)
    const darkMode = useRecoilValue(darkModeAtom)


    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="flex items-center justify-center w-full">
            <div className="lg:flex lg:flex-col  items-center max-w-[1200px]">
                <div className="grow lg:w-[1200px] flex items-center justify-center lg:items-start">
                    <Question title = "Joy" text = {content} nextPath="/wheel" values={joyValues} setValues = {setJoyValues} textareaVisible={false}/>
                </div>
                <div className="w-full lg:w-[100%] flex items-start justify-center max-w-[750px] lg:max-w-[800px] grow z-0">
                        <Lottie animationData={darkMode ? joy_dark : joy} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Joy