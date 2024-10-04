import dotenv from "dotenv"
import { Secret } from "jsonwebtoken"

dotenv.config()


interface ENV {
    PORT : number | undefined,
    SALT_ROUNDS : number | undefined,
    MONGO_URL : string | undefined,
    JWT_SECRET : Secret | undefined,
    EMAIL_ADDRESS : string | undefined,
    EMAIL_PASS : string | undefined
    CLIENT_URL : string | undefined
}

interface Config {
    PORT : number ,
    SALT_ROUNDS : number,
    MONGO_URL : string,
    JWT_SECRET : Secret,
    EMAIL_ADDRESS : string,
    EMAIL_PASS : string
    CLIENT_URL : string
}

function getConfig() : ENV {
    return {
        PORT : process.env.PORT ? Number(process.env.PORT) : undefined,
        SALT_ROUNDS : process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : undefined,
        MONGO_URL : process.env.MONGO_URL,
        JWT_SECRET : process.env.JWT_SECRET,
        EMAIL_ADDRESS : process.env.EMAIL_ADDRESS,
        EMAIL_PASS : process.env.EMAIL_PASS,
        CLIENT_URL : process.env.CLIENT_URL
    }
}

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return config as Config;
  };
  
  const config = getConfig();
  
  const sanitizedConfig = getSanitizedConfig(config);
  
  export default sanitizedConfig;