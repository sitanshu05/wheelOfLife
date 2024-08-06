import Question from "../layouts/Question"
import mission from "../assets/images/mission.png"
import {useRecoilState} from "recoil"
import { missionAtom } from "../data/atoms/missionAtom"

const Mission : React.FunctionComponent = () => {

    const content = "This is text about Mission, more text about Mission , some more text about Mission"

    const [missionValues, setMissionValues] = useRecoilState(missionAtom)

    return (
        <>
            <Question title = "Mission" text = {content} nextPath="/joy" values={missionValues} setValues={setMissionValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={mission} alt="" className="w-[70%]"/>
            </div>
        </>
    )

} 

export default Mission