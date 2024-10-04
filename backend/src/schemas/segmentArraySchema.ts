import zod from "zod"
import segmentSchema from "./segmentSchema"

const segmentArraySchema = zod.array(segmentSchema).refine(items => {
    const names = items.map(item => { return item.name})
    return new Set(names).size === names.length
})

export default segmentArraySchema;