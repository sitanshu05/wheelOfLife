import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const romanceAtom = atom({
    key : "romanceAtom",
    default : {
        name : "romance",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE : [persistAtom]
})