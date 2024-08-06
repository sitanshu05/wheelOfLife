import zod from "zod"


const emailSchema = zod.string().email();

export default emailSchema