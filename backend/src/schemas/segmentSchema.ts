import zod from "zod"
import { segmentNames } from "../constants"

const segmentSchema = zod.object({
    name : zod.enum(segmentNames as [string]),
    rating : zod.number().min(0).max(10),
    improvements : zod.string().max(30)
})

export default segmentSchema