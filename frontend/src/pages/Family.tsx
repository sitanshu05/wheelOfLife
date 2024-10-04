import Question from "../layouts/Question"
import family from "../data/lottie/family.json"
import {useRecoilState} from "recoil"
import { familyAtom } from "../data/atoms/familyAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Family : React.FunctionComponent = () => {

    const content = "This is text about Family, more text about Family , some more text about Family"

    const [familyValues, setFamilyValues] = useRecoilState(familyAtom)

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] lg:mt-[-2.75rem]">
                    <Question title = "Family" text = {content} nextPath="/money" values={familyValues} setValues = {setFamilyValues}/>
                </div>
                <div className="w-[80%] flex items-start justify-center mt-[-7.5rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={family} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Family