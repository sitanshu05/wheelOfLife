import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const moneyAtom = atom({
    key : "moneyAtom",
    default : {
        name : "money",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE : [persistAtom]
})