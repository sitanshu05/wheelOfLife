import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const joyAtom = atom({
    key : "joyAtom",
    default : {
        name : "joy",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE:[persistAtom]
})