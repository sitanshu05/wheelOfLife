import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const familyAtom = atom({
    key : "familyAtom",
    default : {
        name : "family",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE : [persistAtom]
})