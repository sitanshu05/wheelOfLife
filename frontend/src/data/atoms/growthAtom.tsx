import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const growthAtom = atom({
    key : "growthAtom",
    default : {
        name : "growth",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE:[persistAtom]
})