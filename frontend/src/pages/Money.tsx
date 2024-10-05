import Question from "../layouts/Question"
import money from "../data/lottie/money.json"
import {useRecoilState} from "recoil"
import { moneyAtom } from "../data/atoms/moneyAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Money : React.FunctionComponent = () => {

    const content = "Master your finances! Focus on your wallet, budgeting, and wealth management, ensuring you feel secure and empowered to achieve your financial goals."

    const [moneyValues, setMoneyValues] = useRecoilState(moneyAtom)

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px]">
                    <Question title = "Money" text = {content} nextPath="/growth" values={moneyValues} setValues = {setMoneyValues}/>
                </div>
                <div className="w-[80%] flex items-start justify-center mt-[-2rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={money} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Money