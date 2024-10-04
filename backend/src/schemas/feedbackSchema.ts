import zod from "zod"

export const feedbackSchema = zod.object({
    rating : zod.number().min(0).max(5),
    feedback : zod.string().max(60)
})