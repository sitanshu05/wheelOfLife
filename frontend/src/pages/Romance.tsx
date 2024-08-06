import Question from "../layouts/Question"
import romance from "../assets/images/romance.png"
import {useRecoilState} from "recoil"
import { romanceAtom } from "../data/atoms/romanceAtom"

const Romance : React.FunctionComponent = () => {

    const content = "This is text about Romance, more text about Romance , some more text about Romance"

    const [romanceValues, setRomanceValues] = useRecoilState(romanceAtom);

    return (
        <>
            <Question title = "Romance" text = {content} nextPath="/friends" values={romanceValues} setValues={setRomanceValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={romance} alt="" className="w-[60%]"/>
            </div>
        </>
    )

} 

export default Romance