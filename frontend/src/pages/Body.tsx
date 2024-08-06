import Question from "../layouts/Question"
import body from "../assets/images/body.png"
import { useRecoilState } from "recoil"
import { bodyAtom } from "../data/atoms/bodyAtom"

const Body : React.FunctionComponent = () => {

    const content = "This is text about Body, more text about Body , some more text about Body"

    const [bodyValues, setBodyValues] = useRecoilState(bodyAtom);

    return (
        <>
            <Question title = "Body" text = {content} nextPath = "/mind" values={bodyValues}  setValues={setBodyValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={body} alt="" className="w-[86%]"/>
            </div>
        </>
    )

}

export default Body