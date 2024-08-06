import Question from "../layouts/Question"
import money from "../assets/images/money.png"
import {useRecoilState} from "recoil"
import { moneyAtom } from "../data/atoms/moneyAtom"

const Money : React.FunctionComponent = () => {

    const content = "This is text about Money, more text about Money , some more text about Money"

    const [moneyValues, setMoneyValues] = useRecoilState(moneyAtom)

    return (
        <>
            <Question title = "Money" text = {content} nextPath="/growth" values={moneyValues} setValues={setMoneyValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={money} alt="" className="w-[63%]"/>
            </div>
        </>
    )

} 

export default Money