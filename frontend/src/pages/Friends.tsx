import Question from "../layouts/Question"
import friends from "../assets/images/friends.png"
import {useRecoilState} from "recoil"
import { friendsAtom } from "../data/atoms/friendsAtom"

const Friends : React.FunctionComponent = () => {

    const content = "This is text about Friends, more text about Friends , some more text about Friends"

    const [friendsValues, setFriendsValues] = useRecoilState(friendsAtom);

    return (
        <>
            <Question title = "Friends" text = {content} nextPath="/family" values={friendsValues} setValues={setFriendsValues}/>
            <div className="w-full flex items-center justify-center">
                <img src={friends} alt="" className="w-[90%]"/>
            </div>
        </>
    )

} 

export default Friends