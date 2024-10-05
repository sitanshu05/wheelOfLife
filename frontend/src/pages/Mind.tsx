import Question from "../layouts/Question"
import mind from "../data/lottie/mind.json"
import {useRecoilState} from "recoil"
import { mindAtom } from "../data/atoms/mindAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Mind : React.FunctionComponent = () => {

    const content = "Feed your intellect! Focus on mental wellness, emotional resilience, and continuous learning, ensuring your mind is sharp, engaged, and thriving."

    const [mindValues, setMindValues] = useRecoilState(mindAtom);

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] lg:mt-[-2.75rem]">
                    <Question title = "Mind" text = {content} nextPath="/romance" values={mindValues} setValues = {setMindValues}/>
                </div>
                <div className="w-[71%] flex items-start justify-center mt-[-5rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={mind} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Mind