import zod from "zod";

const userSchema = zod.object({
    username : zod.string().min(4).max(30).toLowerCase().trim(),
    email : zod.string().email(),
    frequency : zod.number().min(1).max(12).default(4),
    password : zod.string().min(6)
})

export default userSchema