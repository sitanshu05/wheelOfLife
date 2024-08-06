import Question from "../layouts/Question"
import joy from "../assets/images/joy.png"
import { useRecoilState } from "recoil"
import { joyAtom } from "../data/atoms/joyAtom"

const Joy : React.FunctionComponent = () => {

    const content = "This is text about Joy, more text about Joy , some more text about Joy"

    const [joyValues, setJoyValues] = useRecoilState(joyAtom)

    return (
        <>
            <Question title = "Joy" text = {content} nextPath="/wheel" values={joyValues} setValues={setJoyValues} textareaVisible = {false}/>
            <div className="w-full flex items-center justify-center">
                <img src={joy} alt="" className="w-[62%]"/>
            </div>
        </>
    )

} 

export default Joy