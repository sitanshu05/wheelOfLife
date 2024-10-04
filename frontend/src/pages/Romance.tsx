import Question from "../layouts/Question"
import romance from "../data/lottie/romance.json"
import {useRecoilState} from "recoil"
import { romanceAtom } from "../data/atoms/romanceAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Romance : React.FunctionComponent = () => {

    const content = "This is text about Romance, more text about Romance , some more text about Romance"

    const [romanceValues, setRomanceValues] = useRecoilState(romanceAtom);

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px] ">
                <div className="grow lg:w-[500px] lg:mt-[-6rem]">
                    <Question title = "Romance" text = {content} nextPath="/friends" values={romanceValues} setValues = {setRomanceValues}/>
                </div>
                <div className="w-[71%] flex items-start justify-center mt-[-8.2rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={romance} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Romance