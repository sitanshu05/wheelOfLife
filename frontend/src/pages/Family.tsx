import Question from "../layouts/Question"
import family from "../assets/images/family.png"
import {useRecoilState} from "recoil"
import { familyAtom } from "../data/atoms/familyAtom"

const Family : React.FunctionComponent = () => {

    const content = "This is text about Family, more text about Family , some more text about Family"

    const [familyValues, setFamilyValues] = useRecoilState(familyAtom)

    return (
        <>
            <Question title = "Family" text = {content} nextPath="/money" values={familyValues} setValues={setFamilyValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={family} alt="" className="w-full mt-6 "/>
            </div>
        </>
    )

} 

export default Family