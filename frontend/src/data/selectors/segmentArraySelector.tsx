import {selector} from "recoil"
import { soulAtom } from "../atoms/soulAtom";
import { bodyAtom } from "../atoms/bodyAtom";
import { mindAtom } from "../atoms/mindAtom";
import { romanceAtom } from "../atoms/romanceAtom";
import { friendsAtom } from "../atoms/friendsAtom";
import { familyAtom } from "../atoms/familyAtom";
import { moneyAtom } from "../atoms/moneyAtom";
import { growthAtom } from "../atoms/growthAtom";
import { missionAtom } from "../atoms/missionAtom";
import { joyAtom } from "../atoms/joyAtom";

export const segmentArraySelector = selector({
    key : "segmentArray",
    get : ({get}) => {

        let segmentArray = [];

        const soul = get(soulAtom);
        segmentArray.push(soul);

        const body = get(bodyAtom);
        segmentArray.push(body);

        const mind = get(mindAtom);
        segmentArray.push(mind);

        const romance = get(romanceAtom);
        segmentArray.push(romance);

        const friends = get(friendsAtom);
        segmentArray.push(friends);

        const family = get(familyAtom);
        segmentArray.push(family);

        const money = get(moneyAtom);
        segmentArray.push(money);

        const growth = get(growthAtom);
        segmentArray.push(growth);

        const mission = get(missionAtom);
        segmentArray.push(mission);

        const joy = get(joyAtom);
        segmentArray.push(joy);

        return segmentArray;


    }
})