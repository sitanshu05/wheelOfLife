import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const friendsAtom = atom({
    key : "friendsAtom",
    default : {
        name : "friends",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE : [persistAtom]
})