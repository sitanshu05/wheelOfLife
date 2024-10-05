import Question from "../layouts/Question"
import mission from "../data/lottie/mission.json"
import {useRecoilState} from "recoil"
import { missionAtom } from "../data/atoms/missionAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Mission : React.FunctionComponent = () => {

    const content = "Your purpose in action! Take courage to define and pursue your life’s mission, align your actions with your values and contribute positively to the world around you."

    const [missionValues, setMissionValues] = useRecoilState(missionAtom)

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] ">
                    <Question title = "Mission" text = {content} nextPath="/joy" values={missionValues} setValues = {setMissionValues}/>
                </div>
                <div className="w-[85%] mt-[-9.6rem] lg:w-[100%] flex items-start justify-center  max-w-[500px] grow z-0">
                        <Lottie animationData={mission} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Mission