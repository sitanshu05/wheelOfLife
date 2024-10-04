import Question from "../layouts/Question"
import soul from "../data/lottie/soul.json"
import { useRecoilState } from "recoil"
import { soulAtom } from "../data/atoms/soulAtom"
import Lottie from "lottie-react"
import Header from "../layouts/Header"

const Soul : React.FunctionComponent = () => {

    const content = "This is text about soul, more text about soul , some more text about soul"

    const [soulValues, setSoulValues] = useRecoilState(soulAtom);


    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] lg:mt-[-2.75rem]">
                    <Question title = "Soul" text = {content} nextPath="/body" values={soulValues} setValues = {setSoulValues}/>
                </div>
                <div className="w-[71%] flex items-start justify-center mt-[-5rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={soul} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Soul