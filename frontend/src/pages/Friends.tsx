import Question from "../layouts/Question"
import friends from "../data/lottie/friends.json"
import {useRecoilState} from "recoil"
import { friendsAtom } from "../data/atoms/friendsAtom"
import Header from "../layouts/Header"
import Lottie from "lottie-react"

const Friends : React.FunctionComponent = () => {

    const content = "Celebrate your circle! Reflect on the quality and depth of your friendships, highlighting the importance of connection, support, and fun with those you hold dear."

    const [friendsValues, setFriendsValues] = useRecoilState(friendsAtom);

    return (
        <div className="">
        <div className="mb-4 lg:mb-20 mt-3">
            <Header />
        </div>
        <div className="lg:flex justify-center">
            <div className="lg:flex justify-center items-center max-w-[1200px]">
                <div className="grow lg:w-[500px] ">
                    <Question title = "Friends" text = {content} nextPath="/family" values={friendsValues} setValues = {setFriendsValues}/>
                </div>
                <div className="w-[80%] flex items-start justify-center mt-[-4rem] lg:mt-0 max-w-[500px] grow">
                        <Lottie animationData={friends} loop={true}/>
                </div>
            </div>
        </div>
    </div>
    )

} 

export default Friends