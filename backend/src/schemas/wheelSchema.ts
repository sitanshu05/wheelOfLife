import segmentArraySchema from "./segmentArraySchema";
import zod from "zod";

const wheelSchema = zod.object({
    time : zod.instanceof(Date),
    segments : segmentArraySchema
})

export default wheelSchema