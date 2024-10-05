import Question from "../layouts/Question"
import body from "../data/lottie/body.json"
import { useRecoilState } from "recoil"
import { bodyAtom } from "../data/atoms/bodyAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Body : React.FunctionComponent = () => {

    const content = "Your vessel for life!Focus on physical health, fitness, self-care, are you ready to take on the world?"

    const [bodyValues, setBodyValues] = useRecoilState(bodyAtom);

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] lg:mt-[-2.75rem]">
                    <Question title = "Body" text = {content} nextPath="/mind" values={bodyValues} setValues = {setBodyValues}/>
                </div>
                <div className="w-[71%] flex items-start justify-center mt-[-5rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={body} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Body