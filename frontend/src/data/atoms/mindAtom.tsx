import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const mindAtom = atom({
    key : "mindAtom",
    default : {
        name : "mind",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE:[persistAtom]
})