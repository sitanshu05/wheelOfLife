import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const soulAtom = atom({
    key : "soulAtom",
    default : {
        name : "soul",
        rating : 1,
        improvements : ""
    },
    effects_UNSTABLE: [persistAtom],
})