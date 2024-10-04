import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const missionAtom = atom({
    key : "missionAtom",
    default : {
        name : "mission",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE:[persistAtom]
})