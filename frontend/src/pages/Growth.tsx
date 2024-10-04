import Question from "../layouts/Question"
import growth from "../data/lottie/growth.json"
import growth_dark from "../data/lottie/growth_dark.json"
import {useRecoilState, useRecoilValue} from "recoil"
import { growthAtom } from "../data/atoms/growthAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"
import { darkModeAtom } from "../data/atoms/darkModeAtom"

const Growth : React.FunctionComponent = () => {

    const content = "This is text about Growth, more text about Growth , some more text about Growth"

    const [growthValues, setGrowthValues] = useRecoilState(growthAtom)
    const darkMode = useRecoilValue(darkModeAtom);

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] ">
                    <Question title = "Growth" text = {content} nextPath="/mission" values={growthValues} setValues = {setGrowthValues}/>
                </div>
                <div className="w-[80%] lg:w-[100%] flex items-start justify-center  max-w-[500px] grow z-0">
                        <Lottie animationData={darkMode ? growth_dark : growth} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Growth