import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const bodyAtom = atom({
    key : "bodyAtom",
    default : {
        name : "body",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE : [persistAtom]

})