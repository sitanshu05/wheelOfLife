import Question from "../layouts/Question"
import soul from "../assets/images/soul.png"
import { useRecoilState } from "recoil"
import { soulAtom } from "../data/atoms/soulAtom"

const Soul : React.FunctionComponent = () => {

    const content = "This is text about soul, more text about soul , some more text about soul"

    const [soulValues, setSoulValues] = useRecoilState(soulAtom);


    return (
        <>
            <Question title = "Soul" text = {content} nextPath="/body" values={soulValues} setValues = {setSoulValues}/>
            <div className="w-full flex items-start justify-end">
                <img src={soul} alt="" className="w-[46%]"/>
            </div>
        </>
    )

}

export default Soul