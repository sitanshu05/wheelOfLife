import Question from "../layouts/Question"
import growth from "../assets/images/growth.png"
import {useRecoilState} from "recoil"
import { growthAtom } from "../data/atoms/growthAtom"

const Growth : React.FunctionComponent = () => {

    const content = "This is text about Growth, more text about Growth , some more text about Growth"

    const [growthValues, setGrowthValues] = useRecoilState(growthAtom)

    return (
        <>
            <Question title = "Growth" text = {content} nextPath="/mission" values={growthValues} setValues={setGrowthValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={growth} alt="" className="w-[65%]"/>
            </div>
        </>
    )

} 

export default Growth