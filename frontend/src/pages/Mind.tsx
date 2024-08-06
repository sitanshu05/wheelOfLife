import Question from "../layouts/Question"
import mind from "../assets/images/mind.png"
import {useRecoilState} from "recoil"
import { mindAtom } from "../data/atoms/mindAtom"

const Mind : React.FunctionComponent = () => {

    const content = "This is text about Mind, more text about Mind , some more text about Mind"

    const [mindValues, setMindValues] = useRecoilState(mindAtom);

    return (
        <>
            <Question title = "Mind" text = {content} nextPath="/romance" values = {mindValues} setValues = {setMindValues} />
            <div className="w-full flex items-center justify-center">
                <img src={mind} alt="" className="w-[66%] mt-3"/>
            </div>
        </>
    )

} 

export default Mind